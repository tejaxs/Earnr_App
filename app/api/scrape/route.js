import puppeteer from 'puppeteer';

export async function POST(request) {
  try {
    const body = await request.json(); // Parse JSON body
    const { username } = body;

    if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    console.log(`Navigating to Instagram profile of ${username}`);
    await page.goto(`https://www.instagram.com/${username}/`, {
      waitUntil: 'networkidle2',
    });

    console.log("Page loaded, waiting for elements...");

    // Wait for the specific span element (the bio or text content)
    // await page.waitForSelector('span.x1lliihq.x1plvlek.xryxfnj.x1n2onr6', { timeout: 5000 });
    // await page.waitForSelector('span._ap3a._aaco._aacu._aacx._aad7._aade', { timeout: 5000 });

    // Wait for the profile image to be loaded
    await page.waitForSelector('img.xpdipgo', { timeout: 10000 });

    // Extract the desired data (text content from span and src from img)
    const userDetails = await page.evaluate(() => {
      // const userElement = document.querySelector('span.x1lliihq.x1plvlek.xryxfnj.x1n2onr6');
      // const bio = userElement ? userElement.innerText : null;
      // const userElement1 = document.querySelector('span._ap3a._aaco._aacu._aacx._aad7._aade');
      // const bio1 = userElement1 ? userElement1.innerText : null;

      const profilePicElement = document.querySelector('img.xpdipgo');
      const profilePic = profilePicElement ? profilePicElement.src : null;

      return {  profilePic ,profilePicElement};
    });

    console.log("Scraped data:", userDetails);

    await browser.close();

    return new Response(JSON.stringify(userDetails), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Scraping error:", error);

    return new Response(JSON.stringify({ error: "Failed to fetch Instagram data" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
