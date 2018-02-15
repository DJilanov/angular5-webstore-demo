// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular/cli'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('@angular/cli/plugins/karma')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		files: [
			'./src/assets/jquery/jquery-3.1.1.min.js',
			'./src/assets/jquery/jquery-ui.min.js',
			'./src/assets/bootstrap/js/bootstrap.min.js',
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyApRZsI8vEoytF93IBu5MtwZrv8uhoL8BQ&libraries=places',
			'./mocks/google-mock.js',
			{ pattern: './src/test.ts', watched: false }
		],
		preprocessors: {
			'./src/test.ts': ['@angular/cli']
		},
		mime: {
			'text/x-typescript': ['ts', 'tsx']
		},
		coverageIstanbulReporter: {
			reports: ['html', 'lcovonly'],
			fixWebpackSourcePaths: true
		},
		angularCli: {
			environment: 'dev'
		},
		reporters: config.angularCli && config.angularCli.codeCoverage
			? ['progress', 'coverage-istanbul']
			: ['progress', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false
	});
};
