# Sound Cookies

A react app for interacting with some funny sound clips that are a bit larger than a bite.

[\>\>\> Try it out! <<<](https://delbertina.github.io/sound-cookies/)

[Example link for a saved selection](https://delbertina.github.io/sound-cookies/?data=eyJzZWxlY3RlZFNvdW5kcyI6W3siZmlsZSI6ImpvZS13aGVyZSBhcmUgeW91LTIwMTUtMDEubXAzIiwibmFtZSI6IldoZXJlIGFyZSB5b3U/IiwidGFncyI6WyJKT0UiLCJIT1QiXSwiZHVyYXRpb24iOjAuNDk2MjkyfSx7ImZpbGUiOiJqb2UtY29tZSBvdmVyIGhlcmUtMjAxNS0wMS5tcDMiLCJuYW1lIjoiQ29tZSBvdmVyIGhlcmUiLCJ0YWdzIjpbIkpPRSJdLCJkdXJhdGlvbiI6MC40NzAxNjd9LHsiZmlsZSI6ImpvZS1hbmQgdWgtMjAxNS0wMS5tcDMiLCJuYW1lIjoiQW5kIHVoIiwidGFncyI6WyJKT0UiXSwiZHVyYXRpb24iOjAuNTQ4NTQyfSx7ImZpbGUiOiJqb2UtYmUgYSBib3NzLTIwMTUtMDEubXAzIiwibmFtZSI6IkJlIGEgYm9zcyEiLCJ0YWdzIjpbIkpPRSIsIkhPVCJdLCJkdXJhdGlvbiI6MC44NjIwNDJ9LHsiZmlsZSI6ImpvZS1ydWJiaW5nIGhhbmRzLTIwMTUtMDEubXAzIiwibmFtZSI6IipydWJiaW5nIGhhbmRzKiIsInRhZ3MiOlsiSk9FIiwiSE9UIl0sImR1cmF0aW9uIjowLjk0MDM3NX1dfQ==)

## Soundboard Mode (default for normal page visits)
![image](https://github.com/delbertina/sound-cookies/assets/6349928/2b8430b5-b242-4122-97db-fd8e57592a07)


## Selection Mode (default for saved selection links)
![image](https://github.com/delbertina/sound-cookies/assets/6349928/1918eb0e-2296-4821-8463-d94720073099)

## Menu to toggle display of features
![image](https://github.com/delbertina/sound-cookies/assets/6349928/3362f234-6ec7-4838-82dd-b19d5de55b14)

## Edit variable silence length
![image](https://github.com/delbertina/sound-cookies/assets/6349928/8a6803a6-3060-49bc-bc42-f13d7828dfba)


# Goal Features

- Drag and drop sounds into selection area
- ~~Save and share selects via URL~~ - Done!
- Deeper sorting and filtering ability
- A more automated system for importing new sounds
- ~~Add in variable silence to selection~~
- Save selection as a sound file


# Useful Commands

I use this command to get the duration of all the sounds when importing. It outputs json that I can then match and merge with the existing data. Rather than having a loading timer to load the duration of the sounds, just hard code it into the json file.

```PS
$dir = (Get-Location).tostring()
$file = $dir + "\output.txt"
Clear-Content  $file
Add-Content $file "["
Get-ChildItem $dir -Recurse -filter "*.mp3" | foreach{
   $name = $_.Name
   $duration = ffprobe -i $name -show_format -v quiet | select-string duration
   $name = "{""file"":" + [char]34 + $name + [char]34 + ", "
   $duration = $duration -replace 'duration=', ''
   $duration = """duration"":" + $duration + "},"
   Add-Content $file $name
   Add-Content $file $duration
}
Add-Content $file "]"
```

I use the following Javascript code to merge the arrays by file name and output back as json. Honestly should probably change this to a python script, but this works for now. Array 1 is new info, array 2 is existing info.

Updating Existing Master List
```JS
const array3 = []
array2.forEach((item, index) => {
    const founditem = array1.find(otheritem => otheritem.file == item.file);
    array3.push({file: item.file, name: item.name, tags: item.tags,
    duration: founditem  ? founditem.duration : 0});
});

console.log(JSON.stringify(array3));
```

Adding New Items to Master List
```JS
array3 = JSON.parse(JSON.stringify(array2))

array1.forEach((item, index) => {
    array3.push({file: item.file, name: item.file, tags: [],
    duration: item.duration});
});

function compare( a, b ) {
  if ( a.file < b.file ){
    return -1;
  }
  if ( a.file > b.file ){
    return 1;
  }
  return 0;
}

array3.sort( compare );

console.log(JSON.stringify(array3));
```


--------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
