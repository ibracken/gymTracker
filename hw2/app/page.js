import TextDisappearingComponent from "@/components/linkedin"

export default function Home() {
  return (
    <main>
      <head>
        {/* // Defines the character set, in this case uTF-8 which can represent any character in the Unicode */}
        <meta charset = "utf-8" />
        {/* // <!Makes sure the webpage is responsive to the device's screen width --> */}
        <meta name="viewport" content = "width=device-width,  initial-scale=1.0" />
        <title>My Website Portfolio</title>
      </head>
      <body>
        <div class = "flex-container">
              <div class = "flex-item">
                  <h1 class = "text-box">Hi, I'm Ian Bracken,</h1>
                  <h1 class = "text-box">a student at UNC Chapel Hill! </h1>
              </div>
              <div class = "flex-item">
                  <img class = "box" src="https://lh3.googleusercontent.com/pw/ADCreHe0R9NqoHIAGVOEbZgt9tnnOhZcIsx1HJ5T3gwFJXfEYdORkwzxKKypX7gDbgq3kJ4zTeG1tfxFVQ5YECrro5t-hjmxbDm00tWWaaH9MkWk06U3FX8=w2400" width = "250px"/>
                  <p class="quote">
                      "UNC is a great college!!!"
                      <br/>
                      - Ian Bracken
                  </p>
              </div>
              <div class = "flex-item">
                  <h5>My Experience:</h5>
                  <ul>
                      <li>I have worked with Python, Java, C, and now am doing frontend development.</li>
                      <li>I have worked multiple customer service jobs through which I gave gained valuable soft skills.</li>
                      <li>I am currently vice president of the Sigma Alpha Epsilon Fraternity</li>
                  </ul>
              </div>
          </div>
          <div>
            <div class = "flex-container">
                <div class = "flex-item">
                    <h4>In my free time, I enjoy:</h4>
                    <ol>
                        <li>Volunteering, either at Cat Angels, a cat shelter by my house, or preparing Rameses for football games</li>
                        <li>Playing basketball with friends at Cobb courts</li>
                        <li>Spending time with my pet bird at home</li>
                    </ol>
                </div>
                <div class = "flex-item">
                    <img class = "box" src="https://lh3.googleusercontent.com/pw/ADCreHceaxQYL4msPS4ZKw29XPe5mcwlUB4mlLbNgRg_-yn6ACbhXcIWLOYc-aLp6yckF7YyO6X30JRY2L5ClXCe0fPmAYOA7GV1DPKdZfgoDjeFYG_0yRM=w2400" width = "250px"/>
                </div>
                <div class = "link-item">
                    <h3>My Links:</h3>
                    <a href="https://github.com/ibracken/Personal-Projects">Github</a>
                    
                    <TextDisappearingComponent />


                </div>
                <div class = "link-item">
                    <h3>Contact Info:</h3>
                    <form action="#">
                        <label for="email">
                            Email: <input type="email" id="email" placeholder="Enter your email" />
                        </label>
                        <p></p>
                        <label for="message">
                            Message: <textarea id="message">Your Message</textarea>
                        </label>
                        <button id = "myButton">Submit</button>
                        <script src = "profilescript.js"></script>
                    </form>
                </div>
            </div>
        </div>
      </body>
    </main>
  )
}