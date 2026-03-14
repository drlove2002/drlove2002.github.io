### Read each improvement and break them into seperate task. Remove all done work or irrilivent topics from TODO.md and add these tasks to TODO.md. Complete each task one by one

- Section 04: What Went Wrong: Add More sections to this similer to The cache bug incident. In early days when I used json file for db. It use to crash the bot frequently because bot asyncronously reading and writing user's virtual currency balance.

- Merge Contact page into About page because it's very small.

- Any place where 50,000 or 2000 active people are used, Change those number and replace with actuall number fetched from worldwide discord server's api.

```ts
export async function getServerData() {
  const response = await fetch('https://discord.com/api/invites/worldwide?with_counts=true', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from Discord API');
  }

  const { guild: { icon, banner }, approximate_presence_count, approximate_member_count } = await response.json();

  return {
    onlineMembers: Number(approximate_presence_count).toLocaleString('en-US'),
    totalMembers: Number(approximate_member_count).toLocaleString('en-US'),
    avatar: `https://cdn.discordapp.com/icons/512369682636865556/${icon}.${icon.startsWith("a_") ? 'gif' : 'webp'}?size=256`,
    banner: `https://cdn.discordapp.com/banners/512369682636865556/${banner}.webp?size=1024`,
  };
}
```

Be careful to roundoff at the home page where we are using like 50k+

- the home page's punch line "Five years. One platform. 50,000 people.
From a JSON file to a Rust-powered distributed system." doesn't look good. BEcause I don't want only worldwide should define who I am. Try to see all of the places and look for this similer patter where I'm making myself too attached to his worldwide's idea.

- At homepage Case Study section you can add another section for patter persute project. What is this project? you can learn more from my cv which is in my project directory.
You can also visit the project's github repo to get an idea: <https://github.com/drlove2002/pattern_pursuit>

- The about page is very dry. It should show my story like a film but via interactivity of the website. Noone reads things, They like to interact with it more. You can add more stuffs that you might not know about me from cv/ folder's data

- In writing page, each "5 minute read" like parts are static. It can be dynamically estimated based on the word count of the article. So the writing time part can be removed from each mdx.
