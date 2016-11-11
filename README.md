# CQAIAQMBBQ0FBw8EBAYHCA

Installation
-----

```
git clone https://github.com/vence722/CQAIAQMBBQ0FBw8EBAYHCA [path/to/save]
```

Then make sure the current user has execution right for the .sh scripts.

You may run the following command inside the project root path:
```
chmod a+x *.sh
```

Usage
-----

First cd to the project root path.

Start the job worker:
```
./currency_runner.sh
```

Start the job emitter:
```
./currency_emit_job.sh
```

You may change the parameters in currency_emit_job.sh, to change different input for the job.

Testing
-----

Make sure mocha has been installed in the machine's global node_module repository.

If not, simply run the following command to install it:
```
npm install mocha -g
```

Enter the project root path.

Run the following command:
```
mocha tests --timeout 5000
```

Then you will see the unit testing results on consule.

To verify the DB data, please open cfg.js and find the DB server hostname, username, password, then access the mongodb Server to see the data.
