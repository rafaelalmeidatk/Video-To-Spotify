'use strict';

var lastUrl = location.href;

var start = function() {
	var songTitle = $('#eow-title').text();
	songTitle = cleanTitle(songTitle);
	var songUrl = titleToUrl(songTitle);
	var spotifyQuery = 'https://api.spotify.com/v1/search?type=track&query=' + songUrl;
	$.get(spotifyQuery, function(data) {
		if (data.tracks.items.length) {
			createSpotifyButton(data.tracks.items[0]);
			trackUrlChanges();
		}
	});
};

var createSpotifyButton = function (song) {
	var uri = song.uri;
	var button = $("<a href='" + uri +"' class='video-to-spotify-btn yt-uix-button' alt='Open in Spotify'>Open in Spotify</a>");
	button.css({"background-image": "url(" + chrome.extension.getURL("res/spotify_icon.png") + ")"});
	$('.yt-uix-button-subscription-container').append(button);
	$('.yt-uix-overlay').css('display', 'inline-block');
};

var trackUrlChanges = function() {
	if (location.href != lastUrl) {
		start();
		lastUrl = location.href;
	} else {
		setTimeout(trackUrlChanges, 2000);
	}
};

var cleanTitle = function (title) {
	return title.replace(/(\(.*\)|\{.*\}|\[.*\])/g, '').trim();
};

var titleToUrl = function (title) {
	return encodeURIComponent(title).replace(/%20/g, '+');
};

jQuery(document).ready(start);