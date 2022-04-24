# Discord OAuth2 Example

## Dependencies Used:
  * express
  * url
  * axios
  * path
  * body-parser
  * node-fetch

To install these dependencies, run the following in your terminal (Be sure you have node.js and NPM installed.):

`npm i express url axios path body-parser node-fetch`


Be sure to paste your Client ID and Client Secret in oauth.js and your OAUTH link in index.html.

## Changing the Port
If you don't want to run it on port 80 and instead would prefer or something else (such as 443), change the port variable in `oauth.js`, the POST request URL in `index.html`, and the redirect URI in your Discord developer portal. Changing the redirect URI in the dev portal will also change your OAUTH link, so be sure to generate it again and paste the new one in `index.html`.

## Running the Program
To run the program, type `node oauth.js` in the console and then open the link given in the console. Be sure you have all dependencies installed!

## Code With Less Comments
If you don't want your code filled with comments explaining what it does, you can get it from the `non-annotated` folder.

### Tutorial located [here](https://circlertech.com/working-with-discord-oauth2).
Good luck with your project!
