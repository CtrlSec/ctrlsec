echo "Running tests"
cd tests
npm install
./node_modules/jasmine-node/bin/jasmine-node backend.spec.js --junitreport --output ../build/tests
