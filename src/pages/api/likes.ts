import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

// File path for storing likes count
const LIKES_FILE = join(process.cwd(), 'public', 'likes.json');

async function getLikesCount() {
  try {
    const data = await readFile(LIKES_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.likes || 0;
  } catch (error) {
    // If file doesn't exist, return 0
    return 0;
  }
}

async function setLikesCount(count) {
  try {
    await writeFile(LIKES_FILE, JSON.stringify({ likes: count }), 'utf-8');
  } catch (error) {
    console.error('Error writing likes file:', error);
  }
}

export async function GET() {
  try {
    const likes = await getLikesCount();
    return new Response(JSON.stringify({ likes }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error getting likes:', error);
    return new Response(JSON.stringify({ likes: 0 }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
}

export async function POST() {
  try {
    // Get current count and increment
    const currentLikes = await getLikesCount();
    const newLikes = currentLikes + 1;
    
    // Save new count
    await setLikesCount(newLikes);
    
    return new Response(JSON.stringify({ 
      likes: newLikes,
      message: 'Like added successfully!' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error incrementing likes:', error);
    return new Response(JSON.stringify({ 
      likes: 0,
      message: 'Error updating likes' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
