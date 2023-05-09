document.addEventListener('DOMContentLoaded', function () {
  console.log('PR4ME INIT');

  const localStore = localStorage.getItem('pr4me');
  
  if(localStore) {
    const savedData = JSON.parse(localStore);  
    document.getElementById('baseBranch').value = savedData.baseBranch;
    document.getElementById('compareBranch').value = savedData.compareBranch;
    document.getElementById('repoLink').value = savedData.repoLink.join(',');  
  }

  document.getElementById('myForm').addEventListener('submit', function(e) {
      e.preventDefault();
      var prObject = { baseBranch: '', compareBranch: '', repoLink: ''}
      prObject.baseBranch = document.getElementById('baseBranch').value;
      prObject.compareBranch = document.getElementById('compareBranch').value;
      prObject.repoLink = document.getElementById('repoLink').value.split(',');
      chrome.storage.local.set({pr4me: JSON.stringify(prObject)}, function() {
        console.log('Saved:', prObject);
      });

      const newUrls = [];
      prObject.repoLink.forEach((link) => {
        const formattedLink = link.endsWith('/') ? link : link + '/';
        const newUrl = `${formattedLink}compare/${prObject.baseBranch}...${prObject.compareBranch}`;
        newUrls.push(newUrl);
          chrome.tabs.create({url:newUrl});
      });
      console.log(newUrls);
    });

    var saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener('click', function() {

      var prObject = { baseBranch: '', compareBranch: '', repoLink: ''}
      prObject.baseBranch = document.getElementById('baseBranch').value;
      prObject.compareBranch = document.getElementById('compareBranch').value;
      prObject.repoLink = document.getElementById('repoLink').value.split(',');

      localStorage.setItem('pr4me', JSON.stringify(prObject));

      alert('Data Saved!');
    });

});

// Links 
// https://github.com/genomesmart/assessmentJSONs/,https://github.com/genomesmart/care-patients-ui/,https://github.com/genomesmart/clinichub-UI/,https://github.com/genomesmart/care-node-pdf-maker/,https://github.com/genomesmart/caretablet-UI/