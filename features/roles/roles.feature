Feature: Roles

  Scenario: getting access token
    Given I have a valid credentials, for roles
    When Attempt to get an access token, for roles
    Then Receive an access token successfully, for roles

  Scenario: obtaining roles list
    When I attempt to get roles list from the API
    Then I will receive a list of roles

  Scenario: obtaining a role
    When I attempt to get a single record of role with id 1 from the API
    Then The response will be a record of role with id 1

  Scenario: making a request to add a new role with json data
    When I make a POST request to roles
    Then New role will be save

  Scenario: Making a PUT request to update role with id 3
    When Attempt to update name of role having id 3
    Then Role updated successfully

  Scenario: Making a request to DELETE a role with id 3
    When Attempt to delete a role
    Then Role deleted successfully