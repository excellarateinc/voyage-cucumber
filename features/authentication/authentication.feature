Feature: Authentication

  Scenario: Logging in
    Given I have a valid username and password
    When I attempt to get an access token from the API
    Then I will receive an access token

  Scenario: Failed login
    Given I have an invalid username and password
    When I attempt to get an access token from the API
    Then I will receive a 401 error for no matching username and password