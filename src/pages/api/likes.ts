// Simple in-memory storage with fallback
let likesCount = 0;

// Try to get initial count from environment variable
if (process.env.INITIAL_LIKES) {
  likesCount = parseInt(process.env.INITIAL_LIKES) || 0;
}

async function getLikesCount() {
  return likesCount;
}

async function setLikesCount(count) {
  likesCount = count;
}

export async function GET() {
  try {
    const likes = await getLikesCount();
    console.log('GET /api/likes - returning likes:', likes);
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
