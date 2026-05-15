export const config = {
  runtime: 'edge'
}

export default async function handler() {
  const [streakRes, statsRes, langsRes] = await Promise.all([
    fetch(`https://github-readme-streak-stats.herokuapp.com?user=TochuGV&theme=github-dark-dimmed&hide_border=true&date_format=j%2Fn%5B%2FY%5D&background=transparent`),
    fetch(`https://github-readme-stats-mu-brown-57.vercel.app/api?username=TochuGV&theme=github_dark_dimmed&hide_border=true&hide_title=true&include_all_commits=true&count_private=true&show_icons=true&bg_color=00000000&card_width=495`),
    fetch(`https://github-readme-stats-mu-brown-57.vercel.app/api/top-langs/?username=TochuGV&theme=github_dark_dimmed&hide_border=true&hide_title=true&layout=donut-vertical&bg_color=00000000`)
  ])

  const streakSvg = await streakRes.text()
  const statsSvg = await statsRes.text()
  const langsSvg = await langsRes.text()

  const svgs = [streakSvg, statsSvg, langsSvg];

  if (svgs.some(svg => svg.includes('Something went wrong'))) {
    return new Response('External API error', { status: 500 })
  }  

  const finalSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 810 375" width="100%">
      
      <style>
        .github-card {
          fill: #22272e;
          rx: 4.5px;
        }
      </style>

      <rect x="0" y="0" width="495" height="195" class="github-card" />
      <rect x="0" y="210" width="495" height="165" class="github-card" />
      <rect x="510" y="0" width="300" height="375" class="github-card" />

      <g transform="translate(0, 0)">
        ${streakSvg}
      </g>
      
      <g transform="translate(5, 210)">
        ${statsSvg}
      </g>
      
      <g transform="translate(510, 30)">
        ${langsSvg}
      </g>

    </svg>
  `

  return new Response(finalSvg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=2592000'
    }
  })
}
