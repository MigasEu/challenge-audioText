# AudioText

## Framework choice

Decided to go with nestjs because it allows for good code practices (by default). In my opinion, is really good for developing well structured code and tests.
I highlight the dependency injection by default, which allows for an easier time when doing the unit tests (using the great tools nest provides for that) and decorators, that allow for an easy to read separation of logic.

## Architecture

Decided to go with a nestjs server because it's something I'm used to and fast to start working on (considering the time limit).
A different approach like serverless or something would take to much for me to waste on the infrastructure.
Prepared a dockerfile so it could later on be deployed as a container, for example, on kubernetes. (didn't actually tested it, because I don't have docker nor space to install it in this PC, with the 2h limit)


## Note

Forgot and got no more time to fix the endpoint response. Should be fixed to return the actual file content.
