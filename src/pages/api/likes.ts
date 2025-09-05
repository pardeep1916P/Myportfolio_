import { kv } from '@vercel/kv';

// Simple in-memory storage for local development
let likesCount = 0;

export async function GET() {
  try {
    // Check if we're in production (Vercel KV available)
    if (process.env.KV_REST_API_URL) {
      const likes = await kv.get('website-likes') || 0;
      return new Response(JSON.stringify({ likes: Number(likes) }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    } else {
      // Local development fallback
      return new Response(JSON.stringify({ likes: likesCount }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }
  } catch (error) {
    console.error('Error getting likes:', error);
    // Fallback to local storage on error
    return new Response(JSON.stringify({ likes: likesCount }), {
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
    // Check if we're in production (Vercel KV available)
    if (process.env.KV_REST_API_URL) {
      const currentLikes = await kv.get('website-likes') || 0;
      const newLikes = Number(currentLikes) + 1;
      await kv.set('website-likes', newLikes);
      
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
    } else {
      // Local development fallback
      likesCount += 1;
      
      return new Response(JSON.stringify({ 
        likes: likesCount,
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
    }
  } catch (error) {
    console.error('Error incrementing likes:', error);
    // Fallback to local storage on error
    likesCount += 1;
    return new Response(JSON.stringify({ 
      likes: likesCount,
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
