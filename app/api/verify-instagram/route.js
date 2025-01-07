import axios from 'axios';

export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const { username, emojiString } = await request.json();
    
    // Validate the input
    if (!username || typeof username !== 'string' || !emojiString || typeof emojiString !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid username or emoji string provided.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Make a request to Instagram API to fetch user profile data
    const response = await axios.get(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        Priority: 'u=1, i',
        'Sec-CH-UA': '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'Sec-CH-UA-Full-Version-List': '"Brave";v="131.0.0.0", "Chromium";v="131.0.0.0", "Not_A Brand";v="24.0.0.0"',
        'Sec-CH-UA-Mobile': '?0',
        'Sec-CH-UA-Model': '""',
        'Sec-CH-UA-Platform': '"Windows"',
        'Sec-CH-UA-Platform-Version': '"15.0.0"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-GPC': '1',
        'X-ASBD-ID': '129477',
        'X-CSRFToken': 'vAux-SxWsSBm558fXbQGED',
        'X-IG-App-ID': '936619743392459',
        'X-IG-WWW-Claim': '0',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Web-Session-ID': '2aejfz:056i3r:thvntl',
        Referer: `https://www.instagram.com/${username}/`,
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    });

    // Extracting relevant fields from response data
    const user = response.data.data.user;

    // Check if the response data is valid
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Failed to retrieve user profile data or profile does not exist.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract the biography from the user profile
    const bio = user.biography || '';

    // Check if the emoji string is present in the biography
    if (bio.includes(emojiString)) {
      // Profile data
      const profileData = {
        bio: user.biography || '', // Biography
        follower_count: user.edge_followed_by.count || 0, // Follower count
        following_count: user.edge_follow.count || 0, // Following count
        name: user.full_name || '', // Full name
        profile_pic: user.profile_pic_url || '', // Profile picture URL
      };

      // Return verification success along with profile data
      return new Response(
        JSON.stringify({ message: 'Verification successful!', profileData }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Verification failed
      const profileData = {
        bio: user.biography || '', // Biography
        follower_count: user.edge_followed_by.count || 0, // Follower count
        following_count: user.edge_follow.count || 0, // Following count
        name: user.full_name || '', // Full name
        profile_pic: user.profile_pic_url || '', // Profile picture URL
      };
      console.log(profileData);
      
      
      return new Response(
        JSON.stringify({ error: 'Verification failed! The emoji string was not found in the bio.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error scraping Instagram profile:', error.message);

    // Return an error response
    return new Response(
      JSON.stringify({ error: `An error occurred while scraping: ${error.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
