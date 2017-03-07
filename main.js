
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
      let mostStars = 0;
      let repoName;
      let ownerName;

      data.forEach(function compareStars(each) {
        console.log(each.stargazers_count);
        if (each.stargazers_count > mostStars) {
          mostStars = each.stargazers_count;
          repoName = each.name;
          ownerName = each.owner.login;
        }


      });
      console.log(mostStars, repoName, ownerName);

      // here
      let secondMostStars = fetch(
        'https://api.github.com/repos/'+ownerName+'/'+repoName+'/contributors',
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
          if ( responseObj.status > 199 && responseObj.status < 300) {
            responseObj.json().then( function compareStars(contributors) {
              contributors.forEach(function anotherContributor(eachContributor) {
                console.log(eachContributor.login);
              });
            });
          } else {
            console.log('We gotta problem fam');
          }
        });
      });

    } else {
      console.log('We gotta problem fam ');
    }

);
