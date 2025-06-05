import os
import re
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import openai
import argparse
from typing import Dict, List, Any

# Configure OpenAI (optional)
# openai.api_key = "your-api-key"  # Uncomment and add your API key if using OpenAI

class FirestoreDataGenerator:
    def __init__(self, project_path: str, use_openai: bool = False):
        self.project_path = project_path
        self.use_openai = use_openai
        self.interfaces = {}
        self.dummy_data = {}
        self.collection_relationships = {}
        
    def init_firebase(self, cred_path: str):
        """Initialize Firebase with credentials"""
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()
        print("Firebase initialized successfully!")
        
    def scan_files(self):
        """Scan project files to extract interfaces and data models"""
        print(f"Scanning project files in {self.project_path}...")
        
        for root, _, files in os.walk(self.project_path):
            for file in files:
                if file.endswith('.tsx') or file.endswith('.ts'):
                    file_path = os.path.join(root, file)
                    self._process_file(file_path)
                    
        print(f"Found {len(self.interfaces)} interfaces")
        for name, props in self.interfaces.items():
            print(f"- {name}: {len(props)} properties")
            
    def _process_file(self, file_path: str):
        """Process a single TypeScript/TSX file to extract interfaces"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Extract interfaces
            interface_pattern = r"interface\s+(\w+)\s*{([^}]*)}"
            interface_matches = re.findall(interface_pattern, content, re.DOTALL)
            
            for match in interface_matches:
                interface_name = match[0]
                interface_body = match[1].strip()
                
                props = {}
                prop_pattern = r"(\w+)(\??)\s*:\s*(\w+)"
                prop_matches = re.findall(prop_pattern, interface_body)
                
                for prop_match in prop_matches:
                    prop_name = prop_match[0]
                    is_optional = prop_match[1] == '?'
                    prop_type = prop_match[2]
                    props[prop_name] = {
                        'type': prop_type,
                        'optional': is_optional
                    }
                
                self.interfaces[interface_name] = props
                
            # Look for hardcoded arrays/objects that could be collection data
            data_pattern = r"const\s+(\w+)\s*=\s*(\[.*?\]|\{.*?\})"
            data_matches = re.findall(data_pattern, content, re.DOTALL)
            
            # Also look for relationships between collections
            relation_pattern = r"(\w+)\.map\(\(\w+\)\s*=>\s*{[^}]*?(\w+)\.id[^}]*?}\)"
            relation_matches = re.findall(relation_pattern, content, re.DOTALL)
            
            for match in relation_matches:
                parent = match[0]
                child = match[1]
                if parent not in self.collection_relationships:
                    self.collection_relationships[parent] = []
                if child not in self.collection_relationships[parent]:
                    self.collection_relationships[parent].append(child)
                
        except Exception as e:
            print(f"Error processing file {file_path}: {str(e)}")
            
    def generate_dummy_data(self):
        """Generate dummy data for each interface"""
        print("Generating dummy data...")
        
        for interface_name, props in self.interfaces.items():
            if self.use_openai:
                self.dummy_data[interface_name] = self._generate_with_openai(interface_name, props)
            else:
                collection_data = []
                # Generate 10 dummy items for each collection
                for i in range(10):
                    item = {}
                    for prop_name, prop_info in props.items():
                        item[prop_name] = self._generate_dummy_value(prop_name, prop_info['type'])
                    collection_data.append(item)
                self.dummy_data[interface_name] = collection_data
        
        print(f"Generated dummy data for {len(self.dummy_data)} collections")
        
    def _generate_dummy_value(self, prop_name: str, prop_type: str) -> Any:
        """Generate a dummy value based on property name and type"""
        if prop_name == 'id':
            return f"doc_{hash(f'{prop_name}_{prop_type}_{os.urandom(4).hex()}') % 10000}"
        
        if prop_type == 'string':
            if 'title' in prop_name.lower():
                titles = ["Sinners", "Love is Weird", "The Last Adventure", "Running Man", "City of Dreams"]
                return titles[hash(prop_name) % len(titles)]
            elif 'image' in prop_name.lower() or 'preview' in prop_name.lower():
                return f"https://placeholder.com/images/{hash(prop_name) % 100}.jpg"
            elif 'genre' in prop_name.lower():
                genres = ["Action", "Drama", "Romance", "Sport", "Adventure", "Comedy"]
                return genres[hash(prop_name) % len(genres)]
            elif 'year' in prop_name.lower():
                return str(2020 + (hash(prop_name) % 5))
            elif 'duration' in prop_name.lower():
                return f"{90 + (hash(prop_name) % 60)} min"
            else:
                return f"Sample {prop_name}"
                
        elif prop_type == 'number':
            if 'rating' in prop_name.lower():
                return round((hash(prop_name) % 20) / 2 + 5, 1)  # Rating between 5.0-9.9
            else:
                return hash(prop_name) % 100
                
        elif prop_type == 'boolean':
            return hash(prop_name) % 2 == 0
            
        elif prop_type == 'array' or prop_type.startswith('Array'):
            return []
            
        return None
        
    def _generate_with_openai(self, interface_name: str, props: Dict) -> List[Dict]:
        """Use OpenAI to generate more realistic dummy data"""
        try:
            # Skip if OpenAI key not configured
            if not openai.api_key:
                return self._generate_dummy_value(interface_name, "object")
                
            prompt = f"""Generate 5 JSON objects for a streaming platform like Netflix based on this TypeScript interface:
            
            interface {interface_name} {{
                {', '.join([f'{name}: {info["type"]}' for name, info in props.items()])}
            }}
            
            The data should be realistic for a streaming platform's content. Format as JSON array.
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that generates realistic dummy data."},
                    {"role": "user", "content": prompt}
                ]
            )
            
            result = response.choices[0].message.content
            # Extract JSON array from response
            json_match = re.search(r'\[[\s\S]*\]', result)
            if json_match:
                data = json.loads(json_match.group(0))
                return data
            return []
            
        except Exception as e:
            print(f"Error using OpenAI for {interface_name}: {str(e)}")
            # Fall back to basic generation
            return self._generate_dummy_value(interface_name, "object")
            
    def design_firestore_schema(self):
        """Design the Firestore schema based on interfaces and relationships"""
        print("Designing Firestore schema...")
        
        schema = {}
        for interface_name, props in self.interfaces.items():
            collection_name = interface_name.lower() + 's'  # Simple pluralization
            
            schema[collection_name] = {
                'fields': props,
                'subcollections': []
            }
            
            # Add relationships
            if interface_name in self.collection_relationships:
                for related in self.collection_relationships[interface_name]:
                    if related in self.interfaces:
                        related_collection = related.lower() + 's'
                        schema[collection_name]['subcollections'].append(related_collection)
        
        print("Designed schema with the following collections:")
        for collection, details in schema.items():
            subcoll_info = f" (with subcollections: {', '.join(details['subcollections'])})" if details['subcollections'] else ""
            print(f"- {collection}{subcoll_info}")
            
        return schema
        
    def upload_to_firestore(self):
        """Upload the dummy data to Firestore"""
        if not hasattr(self, 'db'):
            print("Firebase not initialized. Call init_firebase() first.")
            return
            
        schema = self.design_firestore_schema()
        
        print("Uploading data to Firestore...")
        
        for interface_name, data_list in self.dummy_data.items():
            collection_name = interface_name.lower() + 's'  # Simple pluralization
            
            print(f"Uploading {len(data_list)} documents to '{collection_name}'")
            
            # Create batch for efficient writes
            batch = self.db.batch()
            
            for item in data_list:
                doc_ref = self.db.collection(collection_name).document(item.get('id', self.db.collection(collection_name).document().id))
                batch.set(doc_ref, item)
                
            # Commit the batch
            batch.commit()
            
        print("Data upload complete!")
        
    def generate_connection_code(self):
        """Generate React/TypeScript code for connecting to Firestore"""
        print("Generating Firebase connection code...")
        
        # Create firebase.ts file
        firebase_config = """
// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
"""

        # Create a hooks file for each interface
        hooks = {}
        for interface_name, props in self.interfaces.items():
            collection_name = interface_name.lower() + 's'
            hook_name = f"use{interface_name}s"
            
            hook_code = f"""
// hooks/use{interface_name}s.ts
import {{ useState, useEffect }} from 'react';
import {{ collection, getDocs, query, where, orderBy, limit }} from 'firebase/firestore';
import {{ db }} from '../firebase';

export interface {interface_name} {{
{self._generate_interface_code(props)}
}}

export const {hook_name} = (filters = {{}}, sort = 'id', limitCount = 20) => {{
  const [data, setData] = useState<{interface_name}[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {{
    const fetchData = async () => {{
      try {{
        setLoading(true);
        const q = query(
          collection(db, '{collection_name}'),
          ...Object.entries(filters).map(([field, value]) => where(field, '==', value)),
          orderBy(sort),
          limit(limitCount)
        );
        
        const querySnapshot = await getDocs(q);
        const results: {interface_name}[] = [];
        
        querySnapshot.forEach((doc) => {{
          results.push({{ id: doc.id, ...doc.data() }} as {interface_name});
        }});
        
        setData(results);
        setError(null);
      }} catch (err: any) {{
        console.error('Error fetching {collection_name}:', err);
        setError(err.message);
      }} finally {{
        setLoading(false);
      }}
    }};

    fetchData();
  }}, [JSON.stringify(filters), sort, limitCount]);

  return {{ data, loading, error }};
}};
"""
            hooks[interface_name] = hook_code
            
        # Create a sample implementation
        sample_impl = """
// Example implementation using the Firestore hooks
import React from 'react';
import { useMovies } from '../hooks/useMovies';
import { VideoThumbnail } from '@/components/video-thumbnail';

export default function TrendingNow() {
  const { data: movies, loading } = useMovies({ trending: true }, 'rating', 10);
  
  if (loading) {
    return <div className="animate-spin">Loading...</div>;
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <VideoThumbnail 
          key={movie.id}
          id={movie.id}
          title={movie.title}
          image={movie.image}
          videoPreview={movie.videoPreview}
          genre={movie.genre}
          year={movie.year}
          rating={movie.rating}
        />
      ))}
    </div>
  );
}
"""

        # Create output directory
        os.makedirs("firebase_integration", exist_ok=True)
        
        # Write files
        with open("firebase_integration/firebase.ts", "w") as f:
            f.write(firebase_config)
            
        for interface_name, hook_code in hooks.items():
            os.makedirs("firebase_integration/hooks", exist_ok=True)
            with open(f"firebase_integration/hooks/use{interface_name}s.ts", "w") as f:
                f.write(hook_code)
                
        with open("firebase_integration/sample_implementation.tsx", "w") as f:
            f.write(sample_impl)
            
        print("Generated Firebase connection code in 'firebase_integration' directory")
        
    def _generate_interface_code(self, props: Dict) -> str:
        """Generate TypeScript interface code from props"""
        code = []
        for prop_name, prop_info in props.items():
            optional = '?' if prop_info['optional'] else ''
            code.append(f"  {prop_name}{optional}: {prop_info['type']};")
        return '\n'.join(code)
        

def main():
    parser = argparse.ArgumentParser(description='Generate Firestore data from React/TypeScript project')
    parser.add_argument('--project', required=True, help='Path to React/TypeScript project')
    parser.add_argument('--creds', help='Path to Firebase credentials JSON file')
    parser.add_argument('--upload', action='store_true', help='Upload data to Firestore')
    parser.add_argument('--openai', action='store_true', help='Use OpenAI for generating realistic data')
    
    args = parser.parse_args()
    
    generator = FirestoreDataGenerator(args.project, args.openai)
    generator.scan_files()
    generator.generate_dummy_data()
    generator.design_firestore_schema()
    generator.generate_connection_code()
    
    if args.upload and args.creds:
        generator.init_firebase(args.creds)
        generator.upload_to_firestore()
    elif args.upload:
        print("Firebase credentials required for upload. Use --creds argument.")
    
    print("\nDone! Review the generated files in the 'firebase_integration' directory.")
    

if __name__ == "__main__":
    main()