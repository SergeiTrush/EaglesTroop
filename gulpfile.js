var gulp         = require("gulp"),
	connect      = require("gulp-connect"),
	opn          = require("opn"),
	autoprefixer = require("gulp-autoprefixer"),
	stylus       = require("gulp-stylus"),
	uglify       = require("gulp-uglify"),
	concat       = require("gulp-concat"),
	cssnano      = require("gulp-cssnano"),
	rename       = require("gulp-rename"),
	imagemin     = require("gulp-imagemin"),
	clean        = require("gulp-clean"),
	cache        = require("gulp-cache"),
	pngquant     = require('imagemin-pngquant');
	concatCss    = require('gulp-concat-css');

gulp.task("connect", function() {
	connect.server({
		root: "app",
		livereload: true,
		port: 8080
	})
	opn("http://.localhost:8080");
});	

gulp.task("stylus", function() {
	gulp.src("app/stylus/*.styl")	
	.pipe(stylus())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest("app/css/"))
	.pipe(connect.reload());	
});

gulp.task("html", function() {
	gulp.src("app/*.html")
	.pipe(connect.reload());
});

gulp.task("js", function() {
	gulp.src([
		"app/bower_components/jquery/dist/jquery.min.js",
		"app/bower_components/wow/dist/wow.min.js"
		])
	.pipe(concat("libs.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("app/js"))
	.pipe(connect.reload());
});

gulp.task("css-libs", function() {
	gulp.src([
		"app/css/reset.css",
		"app/bower_components/animate.css/animate.min.css"
		])
	.pipe(concatCss("libs.min.css"))
	.pipe(cssnano())
	.pipe(gulp.dest("app/css"))
});

gulp.task("watch", ['connect', 'css-libs', 'js'], function() {
	gulp.watch(["app/*.html"], ["html"])
	gulp.watch(["app/stylus/*.styl"], ["stylus"])
	gulp.watch(["app/js/*.js"], ["js"]);
});

gulp.task("clean", function() {
	gulp.src("dist", {read: false})
	.pipe(clean())
});

gulp.task('images', function() {
	gulp.src("app/images/*") 
	.pipe(cache(imagemin({  
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/images')); 
});

gulp.task("build", ["connect", "clean", "stylus", "images", "js"], function() {
	var buildCss = gulp.src([
		"app/css/main.css",
		"app/css/libs.min.css",
		])		
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') 
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') 
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/**/*.html') 
	.pipe(gulp.dest('dist'));
});

gulp.task("clear", function (callback) {
	cache.clearAll();
});

gulp.task("default", ["watch"])

