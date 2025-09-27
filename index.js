const API_KEY = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65"; // Using GIPHY's api key
const API_URL = "https://api.giphy.com/v1/gifs/search";
const $ = window.jQuery; // Declare the jQuery variable

$(document).ready(() => {
  loadDefaultGifs();
  $(".nav-link").on("click", function (e) {
    e.preventDefault();

    // Remove active class from all nav links and add to clicked one
    $(".nav-link").removeClass("active");
    $(this).addClass("active");

    // Get the category from the link text
    const category = $(this).text().toLowerCase();

    // Update search input and perform search
    $("#search-input").val(category);
    performSearch(category);
  });
  $("#search-btn").on("click", (e) => {
    e.preventDefault();
    const query = $("#search-input").val().trim();
    console.log("my query", query);
    if (!query) return;

    performSearch(query);
  });

  $("#search-input").on("keypress", (e) => {
    if (e.which === 13) {
      // Enter key
      e.preventDefault();
      const query = $("#search-input").val().trim();
      if (!query) return;
      performSearch(query);
    }
  });
   $(".tab").on("click", function () {
    $(".tab").removeClass("active");
    $(this).addClass("active");
    const tagText = $(this).text().replace("🔍 ", "");
    performSearch(tagText);
  });

   $(".tag").on("click", function () {
    $(".tag").removeClass("active");
    $(this).addClass("active");
    const tagText = $(this).text().replace("🔍 ", "");
    $("#search-input").val(tagText);
    performSearch(tagText);
  });

  });

  function performSearch(query) {
  $("#results").html("<p class='loading'>Loading...</p>");

  $.ajax({
    url: API_URL,
    method: "GET",
    data: {
      api_key: API_KEY,
      q: query,
      limit: 12,
      rating: "pg",
    },
    success: (response) => {
        console.log("response", response);
      renderResults(response.data);
    },
    error: (xhr, status, error) => {
      $("#results").html(`<p class="error">Error: ${error}</p>`);
    },
  });
}


function loadDefaultGifs() {
  $("#results").html("<p class='loading'>Loading...</p>");

  $.ajax({
    url: API_URL,
    method: "GET",
    data: {
      api_key: API_KEY,
      q: "food", // Default search term
      limit: 12,
      rating: "pg",
    },
    success: (response) => {
      renderResults(response.data);
    },
    error: (xhr, status, error) => {
      $("#results").html(
        `<p class="error">Error loading default GIFs: ${error}</p>`
      );
    },
  });
}

function renderResults(items) {
  if (!items || items.length === 0) {
    $("#results").html("<p class='no-results'>No results found.</p>");
    return;
  }

  $("#results").html(""); // clear previous

  items.forEach((item, index) => {
    const gifUrl = item.images.fixed_width.url;
    const title = item.title || "Untitled";

    const sizeClass = getSizeClass(index);
    const card = `
      <div class="gif-item ${sizeClass}">
        <img src="${gifUrl}" alt="${title}" loading="lazy">
      </div>
    `;
    $("#results").append(card);
  });
}

function getSizeClass(index) {
  const patterns = [
    "",
    "tall",
    "wide",
    "",
    "tall",
    "",
    "wide",
    "",
    "",
    "tall",
    "",
    "",
  ];
  return patterns[index % patterns.length];
}