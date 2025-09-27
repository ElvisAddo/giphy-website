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
});