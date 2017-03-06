
let fetch = require('node-fetch');

let promise = fetch(
  'https://api.github.com/users/'+process.argv[2],
  {
    method: 'GET',
    headers: {
        Authorization:'token '+process.argv[3]
    }

  }
);

promise.then( function handleResponse(responseObj) {
  // console.log( responseObj.status );
  if (responseObj.status > 199 && responseObj.status < 300) {

    responseObj.json().then(function printData(myUserData) {
      //console.log( myUserData.name, myUserData.location, myUserData.stargazers );
    });
  } else {

    //console.log( 'There was a problem', responseObj.status );
  }


} );

let mostStars = fetch(
  'https://api.github.com/users/' + process.argv[2] + '/repos',
  {
    method: 'GET',
    headers: {
      Authorization:'token '+process.argv[3]

    }
  }
);

  mostStars.then( function countStars(responseObj) {
    responseObj.json().then(function printData(data) {
      console.log(data[0].stargazers_count);
      data.forEach(function compareStars(each) {
        console.log(each.stargazers_count);
      });
    });
  });
