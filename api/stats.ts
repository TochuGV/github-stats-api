import { Redis } from '@upstash/redis'

export const config = {
  runtime: 'edge'
}

const CACHE_KEY = 'github-stats-svg';
const CACHE_TTL = 60 * 60 * 24;
const FETCH_TIMEOUT = 5000;

const FALLBACK_SVG = `
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
        <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'
                style='isolation: isolate' viewBox='0 0 495 195' width='495px' height='195px' direction='ltr'>
        <style>
            @keyframes currstreak {
                0% { font-size: 3px; opacity: 0.2; }
                80% { font-size: 34px; opacity: 1; }
                100% { font-size: 28px; opacity: 1; }
            }
            @keyframes fadein {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
        </style>
        <defs>
            <clipPath id='outer_rectangle'>
                <rect width='495' height='195' rx='4.5'/>
            </clipPath>
            <mask id='mask_out_ring_behind_fire'>
                <rect width='495' height='195' fill='white'/>
                <ellipse id='mask-ellipse' cx='247.5' cy='32' rx='13' ry='18' fill='black'/>
            </mask>
            
        </defs>
        <g clip-path='url(#outer_rectangle)'>
            <g style='isolation: isolate'>
                <rect stroke='#000000' stroke-opacity='0' fill='#000000' fill-opacity='0' rx='4.5' x='0.5' y='0.5' width='494' height='194'/>
            </g>
            <g style='isolation: isolate'>
                <line x1='165' y1='28' x2='165' y2='170' vector-effect='non-scaling-stroke' stroke-width='1' stroke='#539BF5' stroke-linejoin='miter' stroke-linecap='square' stroke-miterlimit='3'/>
                <line x1='330' y1='28' x2='330' y2='170' vector-effect='non-scaling-stroke' stroke-width='1' stroke='#539BF5' stroke-linejoin='miter' stroke-linecap='square' stroke-miterlimit='3'/>
            </g>
            <g style='isolation: isolate'>
                <!-- Total Contributions big number -->
                <g transform='translate(82.5, 48)'>
                    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#ADBAC7' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>
                        1,031
                    </text>
                </g>

                <!-- Total Contributions label -->
                <g transform='translate(82.5, 84)'>
                    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#539BF5' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='14px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.7s'>
                        Total Contributions
                    </text>
                </g>

                <!-- Total Contributions range -->
                <g transform='translate(82.5, 114)'>
                    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#ADBAC7' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.8s'>
                        9/3/2022 - Present
                    </text>
                </g>
            </g>
            <g style='isolation: isolate'>
                <!-- Current Streak label -->
                <g transform='translate(247.5, 108)'>
                    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#539BF5' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='14px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
                        Current Streak
                    </text>
                </g>

                <!-- Current Streak range -->
                <g transform='translate(247.5, 145)'>
                    <text x='0' y='21' stroke-width='0' text-anchor='middle' fill='#ADBAC7' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 0.9s'>
                        12/5 - 14/5
                    </text>
                </g>

                <!-- Ring around number -->
                <g mask='url(#mask_out_ring_behind_fire)'>
                    <circle cx='247.5' cy='71' r='40' fill='none' stroke='#539BF5' stroke-width='5' style='opacity: 0; animation: fadein 0.5s linear forwards 0.4s'></circle>
                </g>
                <!-- Fire icon -->
                <g transform='translate(247.5, 19.5)' stroke-opacity='0' style='opacity: 0; animation: fadein 0.5s linear forwards 0.6s'>
                    <path d='M -12 -0.5 L 15 -0.5 L 15 23.5 L -12 23.5 L -12 -0.5 Z' fill='none'/>
                    <path d='M 1.5 0.67 C 1.5 0.67 2.24 3.32 2.24 5.47 C 2.24 7.53 0.89 9.2 -1.17 9.2 C -3.23 9.2 -4.79 7.53 -4.79 5.47 L -4.76 5.11 C -6.78 7.51 -8 10.62 -8 13.99 C -8 18.41 -4.42 22 0 22 C 4.42 22 8 18.41 8 13.99 C 8 8.6 5.41 3.79 1.5 0.67 Z M -0.29 19 C -2.07 19 -3.51 17.6 -3.51 15.86 C -3.51 14.24 -2.46 13.1 -0.7 12.74 C 1.07 12.38 2.9 11.53 3.92 10.16 C 4.31 11.45 4.51 12.81 4.51 14.2 C 4.51 16.85 2.36 19 -0.29 19 Z' fill='#539BF5' stroke-opacity='0'/>
                </g>

                <!-- Current Streak big number -->
                <g transform='translate(247.5, 48)'>
                    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#ADBAC7' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='animation: currstreak 0.6s linear forwards'>
                        3
                    </text>
                </g>

            </g>
            <g style='isolation: isolate'>
                <!-- Longest Streak big number -->
                <g transform='translate(412.5, 48)'>
                    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#ADBAC7' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='700' font-size='28px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.2s'>
                        15
                    </text>
                </g>

                <!-- Longest Streak label -->
                <g transform='translate(412.5, 84)'>
                    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#539BF5' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='14px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.3s'>
                        Longest Streak
                    </text>
                </g>

                <!-- Longest Streak range -->
                <g transform='translate(412.5, 114)'>
                    <text x='0' y='32' stroke-width='0' text-anchor='middle' fill='#ADBAC7' stroke='none' font-family='"Segoe UI", Ubuntu, sans-serif' font-weight='400' font-size='12px' font-style='normal' style='opacity: 0; animation: fadein 0.5s linear forwards 1.4s'>
                        24/3/2025 - 7/4/2025
                    </text>
                </g>
            </g>
            
        </g>
    </svg>

      </g>
      
      <g transform="translate(5, 210)">
        
      <svg
        width="495"
        height="165"
        viewBox="0 0 495 165"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="descId"
      >
        <title id="titleId">Tob&#237;as Vallejos' GitHub Stats, Rank: B-</title>
        <desc id="descId">Total Stars Earned: 5, Total Commits  : 1149, Total PRs: 43, Total Issues: 4, Contributed to (last year): 4</desc>
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #539bf5;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          @supports(-moz-appearance: auto) {
            /* Selector detects Firefox */
            .header { font-size: 15.5px; }
          }
          
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #ADBAC7;
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:12px; }
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: #ADBAC7;
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    .rank-percentile-header {
      font-size: 14px;
    }
    .rank-percentile-text {
      font-size: 16px;
    }
    
    .not_bold { font-weight: 400 }
    .bold { font-weight: 700 }
    .icon {
      fill: #539bf5;
      display: block;
    }

    .rank-circle-rim {
      stroke: #539bf5;
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: #539bf5;
      stroke-dasharray: 250;
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }
    
    @keyframes rankAnimation {
      from {
        stroke-dashoffset: 251.32741228718345;
      }
      to {
        stroke-dashoffset: 174.72558195657362;
      }
    }
  
  

          
      /* Animations */
      @keyframes scaleInAnimation {
        from {
          transform: translate(-5px, 5px) scale(0);
        }
        to {
          transform: translate(-5px, 5px) scale(1);
        }
      }
      @keyframes fadeInAnimation {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    
          
        </style>

        

        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="4.5"
          height="99%"
          stroke="#373E47"
          width="494"
          fill="#00000000"
          stroke-opacity="0"
        />

        

        <g
          data-testid="main-card-body"
          transform="translate(0, 25)"
        >
          
    <g data-testid="rank-circle"
          transform="translate(418.5, 47.5)">
        <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
        <circle class="rank-circle" cx="-10" cy="8" r="40" />
        <g class="rank-text">
          
        <text x="-5" y="3" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" data-testid="level-rank-icon">
          B-
        </text>
      
        </g>
      </g>
    <svg x="0" y="0">
      <g transform="translate(0, 0)">
    <g class="stagger" style="animation-delay: 450ms" transform="translate(25, 0)">
      
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
    </svg>
  
      <text class="stat  bold" x="25" y="12.5">Total Stars Earned:</text>
      <text
        class="stat  bold"
        x="219.01"
        y="12.5"
        data-testid="stars"
      >5</text>
    </g>
  </g><g transform="translate(0, 25)">
    <g class="stagger" style="animation-delay: 600ms" transform="translate(25, 0)">
      
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      <path fill-rule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>
    </svg>
  
      <text class="stat  bold" x="25" y="12.5">Total Commits:</text>
      <text
        class="stat  bold"
        x="219.01"
        y="12.5"
        data-testid="commits"
      >1.1k</text>
    </g>
  </g><g transform="translate(0, 50)">
    <g class="stagger" style="animation-delay: 750ms" transform="translate(25, 0)">
      
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      <path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
    </svg>
  
      <text class="stat  bold" x="25" y="12.5">Total PRs:</text>
      <text
        class="stat  bold"
        x="219.01"
        y="12.5"
        data-testid="prs"
      >43</text>
    </g>
  </g><g transform="translate(0, 75)">
    <g class="stagger" style="animation-delay: 900ms" transform="translate(25, 0)">
      
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"/>
    </svg>
  
      <text class="stat  bold" x="25" y="12.5">Total Issues:</text>
      <text
        class="stat  bold"
        x="219.01"
        y="12.5"
        data-testid="issues"
      >4</text>
    </g>
  </g><g transform="translate(0, 100)">
    <g class="stagger" style="animation-delay: 1050ms" transform="translate(25, 0)">
      
    <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
      <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
    </svg>
  
      <text class="stat  bold" x="25" y="12.5">Contributed to (last year):</text>
      <text
        class="stat  bold"
        x="219.01"
        y="12.5"
        data-testid="contribs"
      >4</text>
    </g>
  </g>
    </svg>
  
        </g>
      </svg>
    
      </g>
      
      <g transform="translate(510, 30)">
        
      <svg
        width="300"
        height="345"
        viewBox="0 0 300 345"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="descId"
      >
        <title id="titleId"></title>
        <desc id="descId"></desc>
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #539bf5;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
          @supports(-moz-appearance: auto) {
            /* Selector detects Firefox */
            .header { font-size: 15.5px; }
          }
          
    @keyframes slideInAnimation {
      from {
        width: 0;
      }
      to {
        width: calc(100%-100px);
      }
    }
    @keyframes growWidthAnimation {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #ADBAC7;
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:12px; }
    }
    .bold { font-weight: 700 }
    .lang-name {
      font: 400 11px "Segoe UI", Ubuntu, Sans-Serif;
      fill: #ADBAC7;
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    #rect-mask rect{
      animation: slideInAnimation 1s ease-in-out forwards;
    }
    .lang-progress{
      animation: growWidthAnimation 0.6s ease-in-out forwards;
    }
    

          
      /* Animations */
      @keyframes scaleInAnimation {
        from {
          transform: translate(-5px, 5px) scale(0);
        }
        to {
          transform: translate(-5px, 5px) scale(1);
        }
      }
      @keyframes fadeInAnimation {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    
          
        </style>

        

        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="4.5"
          height="99%"
          stroke="#373E47"
          width="299"
          fill="#00000000"
          stroke-opacity="0"
        />

        

        <g
          data-testid="main-card-body"
          transform="translate(0, 25)"
        >
          
    <svg data-testid="lang-items">
      <g transform="translate(0, 0)">
        <svg data-testid="donut">
          
      <g class="stagger" style="animation-delay: 100ms">
        <circle 
          cx="150"
          cy="100"
          r="80"
          fill="transparent"
          stroke="#3178c6"
          stroke-width="25"
          stroke-dasharray="502.6548245743669"
          stroke-dashoffset="0"
          size="31.928295292894067"
          data-testid="lang-donut"
        />
      </g>
    
      <g class="stagger" style="animation-delay: 200ms">
        <circle 
          cx="150"
          cy="100"
          r="80"
          fill="transparent"
          stroke="#f1e05a"
          stroke-width="25"
          stroke-dasharray="502.6548245743669"
          stroke-dashoffset="160.4891166940825"
          size="31.244798675446955"
          data-testid="lang-donut"
        />
      </g>
    
      <g class="stagger" style="animation-delay: 300ms">
        <circle 
          cx="150"
          cy="100"
          r="80"
          fill="transparent"
          stroke="#555555"
          stroke-width="25"
          stroke-dasharray="502.6548245743669"
          stroke-dashoffset="317.5426046647645"
          size="15.862762751486498"
          data-testid="lang-donut"
        />
      </g>
    
      <g class="stagger" style="animation-delay: 400ms">
        <circle 
          cx="150"
          cy="100"
          r="80"
          fill="transparent"
          stroke="#f34b7d"
          stroke-width="25"
          stroke-dasharray="502.6548245743669"
          stroke-dashoffset="397.277546945897"
          size="13.886499566428936"
          data-testid="lang-donut"
        />
      </g>
    
      <g class="stagger" style="animation-delay: 500ms">
        <circle 
          cx="150"
          cy="100"
          r="80"
          fill="transparent"
          stroke="#663399"
          stroke-width="25"
          stroke-dasharray="502.6548245743669"
          stroke-dashoffset="467.0787069810506"
          size="3.8335890514792506"
          data-testid="lang-donut"
        />
      </g>
    
      <g class="stagger" style="animation-delay: 600ms">
        <circle 
          cx="150"
          cy="100"
          r="80"
          fill="transparent"
          stroke="#5e5086"
          stroke-width="25"
          stroke-dasharray="502.6548245743669"
          stroke-dashoffset="486.34842730266575"
          size="3.2440546622642974"
          data-testid="lang-donut"
        />
      </g>
    
        </svg>
      </g>
      <g transform="translate(0, 220)">
        <svg data-testid="lang-names" x="25">
          <g transform="translate(0, 0)"><g transform="translate(0, 0)">
    <g class="stagger" style="animation-delay: 450ms">
      <circle cx="5" cy="6" r="5" fill="#3178c6" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        TypeScript 31.93%
      </text>
    </g>
  </g><g transform="translate(0, 25)">
    <g class="stagger" style="animation-delay: 600ms">
      <circle cx="5" cy="6" r="5" fill="#f1e05a" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        JavaScript 31.24%
      </text>
    </g>
  </g><g transform="translate(0, 50)">
    <g class="stagger" style="animation-delay: 750ms">
      <circle cx="5" cy="6" r="5" fill="#555555" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        C 15.86%
      </text>
    </g>
  </g></g><g transform="translate(150, 0)"><g transform="translate(0, 0)">
    <g class="stagger" style="animation-delay: 450ms">
      <circle cx="5" cy="6" r="5" fill="#f34b7d" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        C++ 13.89%
      </text>
    </g>
  </g><g transform="translate(0, 25)">
    <g class="stagger" style="animation-delay: 600ms">
      <circle cx="5" cy="6" r="5" fill="#663399" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        CSS 3.83%
      </text>
    </g>
  </g><g transform="translate(0, 50)">
    <g class="stagger" style="animation-delay: 750ms">
      <circle cx="5" cy="6" r="5" fill="#5e5086" />
      <text data-testid="lang-name" x="15" y="10" class='lang-name'>
        Haskell 3.24%
      </text>
    </g>
  </g></g>
        </svg>
      </g>
    </svg>
  
        </g>
      </svg>
    
      </g>

    </svg>
  `

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const fetchSvg = (url: string): Promise<Response> => {
  return fetch(url, { signal: AbortSignal.timeout(3000) })
}

const buildSvg = async (): Promise<string | null> => {
  try {
    const [streakRes, statsRes, langsRes] = await Promise.all([
      fetchSvg(`https://github-readme-streak-stats.herokuapp.com?user=TochuGV&theme=github-dark-dimmed&hide_border=true&date_format=j%2Fn%5B%2FY%5D&background=transparent`),
      fetchSvg(`https://github-readme-stats-mu-brown-57.vercel.app/api?username=TochuGV&theme=github_dark_dimmed&hide_border=true&hide_title=true&include_all_commits=true&count_private=true&show_icons=true&bg_color=00000000&card_width=495`),
      fetchSvg(`https://github-readme-stats-mu-brown-57.vercel.app/api/top-langs/?username=TochuGV&theme=github_dark_dimmed&hide_border=true&hide_title=true&layout=donut-vertical&bg_color=00000000`)
    ])
    
    const streakSvg = await streakRes.text();
    const statsSvg = await statsRes.text();
    const langsSvg = await langsRes.text();

    const svgs = [streakSvg, statsSvg, langsSvg];
    if (svgs.some(svg => svg.includes('Something went wrong'))) return null;
    
    return `
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
  } catch {
    return null;
  }
}

const handler = async () => {
  console.log('URL:', process.env.KV_REST_API_URL)
  console.log('TOKEN:', process.env.KV_REST_API_TOKEN)

  const cached = await redis.get<string>(CACHE_KEY)
  if (cached) {
    buildSvg().then(svg => {
      if (svg) redis.set(CACHE_KEY, svg, { ex: CACHE_TTL })
    })
  
    return new Response(cached, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=2592000',
        'X-Cache': 'HIT'
      }
    })
  }

  const svg = await buildSvg();
  if (svg) {
    await redis.set(CACHE_KEY, svg, { ex: CACHE_TTL })
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=2592000',
        'X-Cache': 'MISS'
      }
    })
  }

  return new Response(FALLBACK_SVG, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'X-Cache': 'FALLBACK'
    }
  })
}

export default handler;