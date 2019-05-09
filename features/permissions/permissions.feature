Feature: Permissions

  Scenario: getting access token
    Given I have a valid credentials, for permissions
    When Attempt to get an access token, for permissions
    Then Receive an access token successfully, for permissions

  Scenario: obtaining permissions list
    When I attempt to get permissions list from the API
    Then I will receive a list of permissions

  Scenario: obtaining a permission
    When I attempt to get a single permission with id 1 from the API
    Then The response will be a permission with id 1

  Scenario: making a request to add a new permission with json data
    When I make a POST request to permissions
    Then New permission will be save

  Scenario: Making a PUT request to update permission with id 17
    When Attempt to update name of permission having id 17
    Then Permission updated successfully

  Scenario: Making a request to DELETE a permission with id 17
    When Attempt to delete a permission
    Then Permission deleted successfully