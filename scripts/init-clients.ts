/**
 * Script to initialize the Clients singleton document in Sanity
 * Run with: npx sanity exec scripts/init-clients.ts --with-user-token
 */

import { getCliInstance } from '@sanity/cli';

const client = getCliInstance().getClient();

async function initializeClients() {
  try {
    // Check if clients document already exists
    const existing = await client.fetch('*[_id == "clients"][0]');

    if (existing) {
      console.log('✓ Clients document already exists');
      console.log('Document:', existing);
      return;
    }

    // Create the clients document
    const result = await client.create({
      _id: 'clients',
      _type: 'clients',
      level1: [],
      level2: [],
      level3: [],
      level4: [],
      level5: [],
    });

    console.log('✓ Successfully created clients document');
    console.log('Document ID:', result._id);
    console.log('You can now add clients in Sanity Studio at: /studio/structure/clients');
  } catch (error) {
    console.error('Error initializing clients:', error);
    process.exit(1);
  }
}

initializeClients();
