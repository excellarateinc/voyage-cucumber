Feature: Profile

  Scenario: getting access token
    Given I have a valid credentials, for profile
    When Attempt to get an access token, for profile
    Then Receive an access token successfully, for profile

  Scenario:
    When Attempt to register a new User profile
    Then Profile created successfully

  Scenario:
    When Attempt to retrieve a user's profile
    Then User's profile will retrieve