Feature: Users

  Scenario: getting access token
    Given I have a valid credentials
    When attempt to get an access token
    Then receive an access token successfully
    
  Scenario: obtaining users list
    When I attempt to get users list from the API
    Then I will receive a list of users

  Scenario: obtaining a user
    When I attempt to get a single user with id 1 from the API
    Then The response will be a user with id 1

 Scenario: Making a POST request with json data
    When I make a POST request to users
    Then New user will be save