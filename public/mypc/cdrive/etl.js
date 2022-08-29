const fs = require('fs');

// process.argv trả về 1 mảng gồm các string chứa lần lượt:
// PATH của NodeJs
// PATH của file source code
// Từ vị trí này là các argument được phân cách bằng dấu cách
// ...
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}
 
var path = process.argv[2];

const blacklist = [
  'index.js',
  'index.html',
  'data.json',
  'test.json'
];

let catalog = {};
 

// readdir 
// doc noi dung trong thu muc chi dinh : path
fs.readdir(path, function(err, items) {
    const files = []; 
    for (var i = 0; i < items.length; i++) {
        if (blacklist.indexOf(items[i]) !== -1) {
          console.log('ignoring ', items[i]);
          continue;
        }
        files.push(new Promise((resolve, reject) => {
          //readFile
          //Doc mot file co san
          fs.readFile(items[i], (err, data) => {
            if (err) return reject(err);
            let text = '';
            if (data.toString) text = data.toString();
            let titleText = text.match(/([^\n]+)/)[0].slice(3);
            resolve({
              url: (/\[(.*?)\]/g).exec(text)[1],
              text: titleText
            });
          });
        }));
    }

    Promise.all(files)
      .then(values => {
        console.log('finally: ', values);
        catalog.values = values;
        fs.writeFile('data.json', JSON.stringify(catalog, null, 2));
      }).catch(err => {
        console.log('final catch', err); 
      });
 
    console.log(catalog);
});

