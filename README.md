# Bubble Tea Hunt
The user can search the location and check the bubble tea shops in the area.
<br>This app fetchs the data from [Yelp](https://www.yelp.com/fusion).

## Demo
When the user comes to the page, the page looks like this.
![chrome-capture (2)-min](https://user-images.githubusercontent.com/51708229/112939834-20083580-9167-11eb-84a1-7c56d7fac187.gif)

<br>The following demo shows how the results show up after searching the location.
<br>The user can either click the search button or hit the enter key to get the results.
![chrome-capture (3)-min](https://user-images.githubusercontent.com/51708229/112940490-2ba82c00-9168-11eb-964e-9e4babff89a8.gif)

The user also can check the bubble tea places on the google map.
<br>By clicking each marker, the user can see the information of each shop. Also, the user can jump to any shop's card underneath the map when clicking the information window on the map.
<br>This works vice versa; clicking the card itself brings the user to the map and opens the information window as well.

<br>This feature is powered by [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) from Google Maps Platform.
<br>*※Since I used this API for development purposes, the watermark is on the map.*
![chrome-capture (5)-min](https://user-images.githubusercontent.com/51708229/112941271-4202b780-9169-11eb-804d-3125ec348afc.gif)


## Installation and Setup Instructions
Clone down `main` repository.

Get your own API key for both [Yelp Fusion](https://www.yelp.com/fusion) and [Maps JavaScript API](https://developers.google.com/maps).<br/>
Then, create `config.js` file and paste those two keys there referring to [`config-sample.js` file](https://github.com/shiv-chan/bubble-tea-hunt/blob/main/config-sample.js).

Open `index.html` file on your browser, and visit the following page.<br/> https://cors-anywhere.herokuapp.com/

Then, you can see the screen like the below. Click the button saying "Request temporary access to the demo server"
<hr/>

![スクリーンショット 2021-09-11 23 43 49](https://user-images.githubusercontent.com/51708229/132995482-be2c2b47-454d-4451-97b0-69cef6fa0037.png)

<hr/>

While accessing to the demo server, the app works as intended.
