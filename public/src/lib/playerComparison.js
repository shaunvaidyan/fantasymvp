jQuery(document).ready(function($){
	function playersTable( element ) {
		this.element = element;
		this.table = this.element.children('.cd-players-table');
		this.tableHeight = this.table.height();
		this.playersWrapper = this.table.children('.cd-players-wrapper');
		this.tableColumns = this.playersWrapper.children('.cd-players-columns');
		this.players = this.tableColumns.children('.player');
		this.playersNumber = this.players.length;
		this.playerWidth = this.players.eq(0).width();
		this.playersTopInfo = this.table.find('.top-info');
		this.statsTopInfo = this.table.children('.stats').children('.top-info');
		this.topInfoHeight = this.statsTopInfo.innerHeight() + 30;
		this.leftScrolling = false;
		this.filterBtn = this.element.find('.filter');
		this.resetBtn = this.element.find('.reset');
		this.filtering = false,
		this.selectedplayersNumber = 0;
		this.filterActive = false;
		this.navigation = this.table.children('.cd-table-navigation');
		// bind table events
		this.bindEvents();
	}

	playersTable.prototype.bindEvents = function() {
		var self = this;
		//detect scroll left inside producst table
		self.playersWrapper.on('scroll', function(){
			if(!self.leftScrolling) {
				self.leftScrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(function(){self.updateLeftScrolling();}, 250) : window.requestAnimationFrame(function(){self.updateLeftScrolling();});
			}
		});
		//select single player to filter
		self.players.on('click', '.top-info', function(){
			var player = $(this).parents('.player');
			if( !self.filtering && player.hasClass('selected') ) {
				player.removeClass('selected');
				self.selectedplayersNumber = self.selectedplayersNumber - 1;
				self.upadteFilterBtn();
			} else if( !self.filtering && !player.hasClass('selected') ) {
				player.addClass('selected');
				self.selectedplayersNumber = self.selectedplayersNumber + 1;
				self.upadteFilterBtn();
			}
		});
		//filter players
		self.filterBtn.on('click', function(event){
			event.preventDefault();
			if(self.filterActive) {
				self.filtering =  true;
				self.showSelection();
				self.filterActive = false;
				self.filterBtn.removeClass('active');
			}
		});
		//reset player selection
		self.resetBtn.on('click', function(event){
			event.preventDefault();
			if( self.filtering ) {
				self.filtering =  false;
				self.resetSelection();
			} else {
				self.players.removeClass('selected');
			}
			self.selectedplayersNumber = 0;
			self.upadteFilterBtn();
		});
		//scroll inside players table
		this.navigation.on('click', 'a', function(event){
			event.preventDefault();
			self.updateSlider( $(event.target).hasClass('next') );
		});
	}

	playersTable.prototype.upadteFilterBtn = function() {
		//show/hide filter btn
		if( this.selectedplayersNumber >= 2 ) {
			this.filterActive = true;
			this.filterBtn.addClass('active');
		} else {
			this.filterActive = false;
			this.filterBtn.removeClass('active');
		}
	}

	playersTable.prototype.updateLeftScrolling = function() {
		var totalTableWidth = parseInt(this.tableColumns.eq(0).outerWidth(true)),
			tableViewport = parseInt(this.element.width()),
			scrollLeft = this.playersWrapper.scrollLeft();

		( scrollLeft > 0 ) ? this.table.addClass('scrolling') : this.table.removeClass('scrolling');

		if( this.table.hasClass('top-fixed') && checkMQ() == 'desktop') {
			setTranformX(this.playersTopInfo, '-'+scrollLeft);
			setTranformX(this.statsTopInfo, '0');
		}

		this.leftScrolling =  false;

		this.updateNavigationVisibility(scrollLeft);
	}

	playersTable.prototype.updateNavigationVisibility = function(scrollLeft) {
		( scrollLeft > 0 ) ? this.navigation.find('.prev').removeClass('inactive') : this.navigation.find('.prev').addClass('inactive');
		( scrollLeft < this.tableColumns.outerWidth(true) - this.playersWrapper.width() && this.tableColumns.outerWidth(true) > this.playersWrapper.width() ) ? this.navigation.find('.next').removeClass('inactive') : this.navigation.find('.next').addClass('inactive');
	}

	playersTable.prototype.updateTopScrolling = function(scrollTop) {
		var offsetTop = this.table.offset().top,
			tableScrollLeft = this.playersWrapper.scrollLeft();
		
		if ( offsetTop <= scrollTop && offsetTop + this.tableHeight - this.topInfoHeight >= scrollTop ) {
			//fix players top-info && arrows navigation
			if( !this.table.hasClass('top-fixed') && $(document).height() > offsetTop + $(window).height() + 200) { 
				this.table.addClass('top-fixed').removeClass('top-scrolling');
				if( checkMQ() == 'desktop' ) {
					this.playersTopInfo.css('top', '0');
					this.navigation.find('a').css('top', '0px');
				}
			}

		} else if( offsetTop <= scrollTop ) {
			//player top-info && arrows navigation -  scroll with table
			this.table.removeClass('top-fixed').addClass('top-scrolling');
			if( checkMQ() == 'desktop' )  {
				this.playersTopInfo.css('top', (this.tableHeight - this.topInfoHeight) +'px');
				this.navigation.find('a').css('top', (this.tableHeight - this.topInfoHeight) +'px');
			}
		} else {
			//player top-info && arrows navigation -  reset style
			this.table.removeClass('top-fixed top-scrolling');
			this.playersTopInfo.attr('style', '');
			this.navigation.find('a').attr('style', '');
		}

		this.updateLeftScrolling();
	}

	playersTable.prototype.updateProperties = function() {
		this.tableHeight = this.table.height();
		this.playerWidth = this.players.eq(0).width();
		this.topInfoHeight = this.statsTopInfo.innerHeight() + 30;
		this.tableColumns.css('width', this.playerWidth*this.playersNumber + 'px');
	}

	playersTable.prototype.showSelection = function() {
		this.element.addClass('filtering');
		this.filterplayers();
	}

	playersTable.prototype.resetSelection = function() {
		this.tableColumns.css('width', this.playerWidth*this.playersNumber + 'px');
		this.element.removeClass('no-player-transition');
		this.resetplayersVisibility();
	}

	playersTable.prototype.filterplayers = function() {
		var self = this,
			containerOffsetLeft = self.tableColumns.offset().left,
			scrollLeft = self.playersWrapper.scrollLeft(),
			selectedplayers = this.players.filter('.selected'),
			numberplayers = selectedplayers.length;

		selectedplayers.each(function(index){
			var player = $(this),
				leftTranslate = containerOffsetLeft + index*self.playerWidth + scrollLeft - player.offset().left;
			setTranformX(player, leftTranslate);
			
			if(index == numberplayers - 1 ) {
				player.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					setTimeout(function(){
						self.element.addClass('no-player-transition');
					}, 50);
					setTimeout(function(){
						self.element.addClass('filtered');
						self.playersWrapper.scrollLeft(0);
						self.tableColumns.css('width', self.playerWidth*numberplayers + 'px');
						selectedplayers.attr('style', '');
						player.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
						self.updateNavigationVisibility(0);
					}, 100);
				});
			}
		});

		if( $('.no-csstransitions').length > 0 ) {
			//browser not supporting css transitions
			self.element.addClass('filtered');
			self.playersWrapper.scrollLeft(0);
			self.tableColumns.css('width', self.playerWidth*numberplayers + 'px');
			selectedplayers.attr('style', '');
			self.updateNavigationVisibility(0);
		}
	}
	
	playersTable.prototype.resetplayersVisibility = function() {
		var self = this,
			containerOffsetLeft = self.tableColumns.offset().left,
			selectedplayers = this.players.filter('.selected'),
			numberplayers = selectedplayers.length,
			scrollLeft = self.playersWrapper.scrollLeft(),
			n = 0;

		self.element.addClass('no-player-transition').removeClass('filtered');

		self.players.each(function(index){
			var player = $(this);
			if (player.hasClass('selected')) {
				n = n + 1;
				var leftTranslate = (-index + n - 1)*self.playerWidth;
				setTranformX(player, leftTranslate);
			}
		});

		setTimeout(function(){
			self.element.removeClass('no-player-transition filtering');
			setTranformX(selectedplayers, '0');
			selectedplayers.removeClass('selected').attr('style', '');
		}, 50);
	}

	playersTable.prototype.updateSlider = function(bool) {
		var scrollLeft = this.playersWrapper.scrollLeft();
		scrollLeft = ( bool ) ? scrollLeft + this.playerWidth : scrollLeft - this.playerWidth;

		if( scrollLeft < 0 ) scrollLeft = 0;
		if( scrollLeft > this.tableColumns.outerWidth(true) - this.playersWrapper.width() ) scrollLeft = this.tableColumns.outerWidth(true) - this.playersWrapper.width();
		
		this.playersWrapper.animate( {scrollLeft: scrollLeft}, 200 );
	}

	var comparisonTables = [];
	$('.cd-players-comparison-table').each(function(){
		//create a playersTable object for each .cd-players-comparison-table
		comparisonTables.push(new playersTable($(this)));
	});
	
	var windowScrolling = false;
	//detect window scroll - fix player top-info on scrolling
	$(window).on('scroll', function(){
		if(!windowScrolling) {
			windowScrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(checkScrolling, 250) : window.requestAnimationFrame(checkScrolling);
		}
	});

	var windowResize = false;
	//detect window resize - reset .cd-players-comparison-table properties
	$(window).on('resize', function(){
		if(!windowResize) {
			windowResize = true;
			(!window.requestAnimationFrame) ? setTimeout(checkResize, 250) : window.requestAnimationFrame(checkResize);
		}
	});

	function checkScrolling(){
		var scrollTop = $(window).scrollTop();
		comparisonTables.forEach(function(element){
			element.updateTopScrolling(scrollTop);
		});

		windowScrolling = false;
	}

	function checkResize(){
		comparisonTables.forEach(function(element){
			element.updateProperties();
		});

		windowResize = false;
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(comparisonTables[0].element.get(0), '::after').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}

	function setTranformX(element, value) {
		element.css({
		    '-moz-transform': 'translateX(' + value + 'px)',
		    '-webkit-transform': 'translateX(' + value + 'px)',
			'-ms-transform': 'translateX(' + value + 'px)',
			'-o-transform': 'translateX(' + value + 'px)',
			'transform': 'translateX(' + value + 'px)'
		});
	}
});