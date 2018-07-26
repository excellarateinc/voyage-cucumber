Feature: Status

  Scenario: obtaining application status
    Given the api is running
    When I hit the status endpoint
    Then I should receive a message with a status and timestamp
