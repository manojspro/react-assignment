import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import axios from "axios";

//define user type with properties we have to show
type User = {
  name: string,
  email: string,
  thumbnail?: string
}

//a card to display random user
const UserCard = () => {
  //define a default user to show in case of any errors or before fetching apis
  const defaultUser: User = {
    name: "Manoj",
    email: "manoj.salvi.pro@gmail.com",
    thumbnail: "https://i.pravatar.cc/300"
  }
  const [user, setUser]: [User, (user: User) => void] = React.useState(defaultUser);

  //reusable function to get a random user
  const getRandomUser = async () => {
    let url = "https://randomuser.me/api";
    axios.get(url)
      .then((response) => {
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if (responseOK) {
          let data = response.data;
          //since the data returned from the api have results(an Array)
          //we will extract the user info from it to construct a User Type to show only props we need to show
          let results = data.results;
          //since we only want to show one user first so we will directly grab the first(index->0)
          let user: User = {
            name: results[0].name.title + " " + results[0].name.first + " " + results[0].name.last,
            email: results[0].email,
            thumbnail: results[0].picture.large
          }
          //set the user with current state to show in the card
          setUser(user);
          //since it was asked in the assignment to save user to local storage so we will do it
          //although we are not using local storage for showing user
          //we are simply using State to show every random userks
          localStorage.setItem('user', JSON.stringify(user));
        }
        else {
          fallBackForAPIError()
        }
      }).catch((err) => {
        console.log(err);
        fallBackForAPIError();
      });

  }

  const fallBackForAPIError = () => {
    //in case we didn't get the right response
    //show deafult user and show an alert as well to inform error occurred
    setUser(defaultUser);
    //use default error for now
    alert("Error getting random User, Please try again!");
  }

  //get a random user on initial load
  React.useEffect(() => {
    //utilize reusable get Random user function for setting the new user
    getRandomUser();
  }, [])

  //click event handler for refresh button
  const onclickRefresh = () => {
    //utilize reusable get Random user function for setting the new user
    getRandomUser();
  }
  return (
    <>
      <div className='container d-flex justify-content-center py-4'>
        <Card style={{ width: '18rem' }}>
          <Card.Header>
            <h4 className='d-inline-block'>Random User</h4>
            <Button variant="primary"
              className='float-end'
              onClick={onclickRefresh}>Refresh
            </Button>
          </Card.Header>
          <Card.Img variant="top" src={user.thumbnail} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              {user.email}
            </Card.Text>

          </Card.Body>
        </Card>
      </div>

    </>
  )
}

export default UserCard;