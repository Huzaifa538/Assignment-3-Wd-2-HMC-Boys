  const apiUrl = "https://api.github.com/users";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const proCon = document.getElementById("proCon");

const profileCard = (profile) => {
  return `
    <div class="profile-card">
      <div class="top-section">
        <div class="left">
          <div class="avatar">
            <img src="${profile.avatar_url}" alt="avatar">
          </div>
          <div class="self">
            <h1>${profile.name || "No Name Provided"}</h1>
            <h2>@${profile.login}</h2>
          </div>
        </div>
        <button><a href="${profile.html_url}" target="_blank">Visit</a></button>
      </div>

      <div class="about">
        <h2>About</h2>
        <p>${profile.bio || "No bio available."}</p>
      </div>

      <div class="status">
        <div class="status-item">
          <h3>Followers</h3>
          <p>${profile.followers}</p>
        </div>
        <div class="status-item">
          <h3>Following</h3>
          <p>${profile.following}</p>
        </div>
        <div class="status-item">
          <h3>Repos</h3>
          <p>${profile.public_repos}</p>
        </div>
      </div>
    </div>
  `;
};

const fetchUrl = async () => {
  const userName = searchInput.value.trim();
  if (!userName) {
    alert("Please enter a GitHub username.");
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/${userName}`);
    const data = await res.json();

    if (data.message === "Not Found") {
      proCon.innerHTML = `<p>User not found.</p>`;
    } else {
      proCon.innerHTML = profileCard(data);
    }
  } catch (err) {
    console.log("Fetch error:", err);
    proCon.innerHTML = `<p>Something went wrong. Try again later.</p>`;
  }
};

searchBtn.addEventListener("click", fetchUrl);
