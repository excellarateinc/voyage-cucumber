Feature: Users

  Scenario: getting access token
    Given I have a valid credentials, for users
    When Attempt to get an access token, for users
    Then Receive an access token successfully, for users
    
  Scenario: obtaining users list
    When I attempt to get users list from the API
    Then I will receive a list of users

  Scenario: obtaining a user
    When I attempt to get a single user with id 1 from the API
    Then The response will be a user with id 1

  Scenario: Making a POST request with json data
    When I make a POST request to users
    Then New user will be save

  Scenario: Making a PUT request to update user with id 3
    When Attempt to update first name of user having id 3
    Then User updated successfully

  Scenario: Making a DELETE request
    When Attempt to delete a user
    Then User deleted successfully