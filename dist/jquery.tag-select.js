/*! Tag Select - v0.1.0 - 2017-08-15
* https://github.com/superhos/jquery-tag-select
* Copyright (c) 2017 SevensChan; Licensed MIT */
(function($) {

  $.fn.extend({
    tagSelect: function (option){
      var plugin = new TagSelect(this, option);
      return plugin.init();
    }
  });

  // Static method.
  var TagSelect = function (ele, opt){
    // Private Variable
    this.$element = ele;
    this.defaultSetting = { 
      maxNum: -1,
      inputCss: {height:'35px',minWidth:'80px',background:'#FFF'},
      dropdownCss: {},
      itemCss: {background:'#76d3ff'},
      existAnim: 'swing',
      targetInput: 'tags' ,
      separator: ',',
      defaultItem: []
    };
    this.setting = $.extend({}, $.tag_select.options, options);
    this.targetInput = $('#' + this.setting.targetInput);
    this.inputbox = null;
    this.dropdown = null;
    this.tagList = [];

    //clean defaulItem
    if (typeof this.setting.defaultItem === "String"){
      this.setting.defaultItem = this.setting.defaultItem.join(',');
    }

    this.currentTagList = this.setting.defaultItem;

    //全局变量
    var _self = this;
    //私有方法
    
    //初始化控件内容
    this.initView = function(){
      //输入框
      var inputboxHtml = '<div class="tag-select-input"></div>';
      this.$element.prepend(inputboxHtml);
      this.inputbox = $('.tag-select .tag-select-input');
      this.inputbox.css(this.setting.inputCss);

      //下拉框
      var dropdownHtml = '<div class="tag-select-drop"></div>';
      this.$element.append(dropdownHtml);
      this.dropdown =$('.tag-select .tag-select-drop');
      this.dropdown.css(this.setting.dropdownCss);

      //标签
      var tagHtml = '<div class="tag-select-item">{content}</div>';
      var tagListView = $('.tag-select ul li');
      $.each(tagListView,function(k,v){
        var content = $(v).html();
        _self.tagList.push(content);
        _self.dropdown.append(tagHtml.replace('{content}',content));
      });
      $('.tag-select.item').css(this.setting.itemCss);

      //更新默认界面
      this.updateTagInputView();
      //绑定事件
      this.bindEvent();
    };

    this.packageTag = function(content){
      var tagHtml = '<div class="tag-select-item animated"><span>{content}</span><span class="close" data="{content}"></span></div>';
      return tagHtml.replace(/\{content\}/g,content);
    };

    this.bindEvent = function(){
      this.inputbox.click(this.switchDropDown);
      $('.tag-select-drop .tag-select-item').click(this.addTag);
      $(document.body).on('click',function(e){
        if (!($(e.target).hasClass('tag-select-input') || $(e.target).hasClass('tag-select-item') || $(e.target).hasClass('close') || $(e.target).hasClass('tag-select-drop'))){
          _self.closeDropDown(e);
        }
      });
      $(document.body).on('mozAnimationEnd animationend webkitAnimationEnd oAnimationEnd',function(){
        $('.tag-select-item').removeClass(_self.setting.existAnim);
      });
      $(document.body).on('click','.tag-select-input .tag-select-item .close',this.removeTag);
    };

    //显示下拉/隐藏下拉
    this.switchDropDown = function(e){
      if ($(e.target).hasClass('tag-select-item') || $(e.target).hasClass('close'))return;
      if (_self.dropdown.is(':hidden')){
        _self.dropdown.show();
      }else{
        _self.dropdown.hide();
      }
    };

    this.closeDropDown = function(e){
      _self.dropdown.hide();
    };

    this.checkIsExist = function(val){
      return ($.inArray(val,this.currentTagList) != -1);
    };

    this.updateTagInputView = function(){
      $.each(_self.currentTagList,function(i,v){
        _self.inputbox.append(_self.packageTag(v));
        _self.dropdown.css({'top':_self.inputbox.height() + 6 + 'px','width':_self.inputbox.width() + 12 + 'px'});
        _self.updateValue();
      });
    }

    this.addTag = function(e){
      var tag = $(e.target).html();
      if (!_self.checkIsExist(tag)){
        if (_self.setting.maxNum != -1 && _self.currentTagList.length >= _self.setting.maxNum){
          _self.callOverflow();
          return;
        }
        _self.inputbox.append(_self.packageTag(tag));
        _self.currentTagList.push(tag);
        _self.dropdown.css({'top':_self.inputbox.height() + 6 + 'px','width':_self.inputbox.width() + 12 + 'px'});
        _self.updateValue();
        //更新
      }else{
        _self.shakeTag(tag);
      }
    };

    this.updateValue = function(){
      this.targetInput.val(_self.currentTagList.join(_self.setting.separator));
    };

    this.shakeTag = function(tag){
      $.each($('.tag-select-input .tag-select-item span'),function(k,v){
        if ($(v).html().trim() === tag){
          $(v).parent('.tag-select-item').addClass(_self.setting.existAnim);
          return;
        }
      });
    };

    this.removeTag = function(e){
      var tag = $(e.target).attr('data');
      var tagHtml = $(e.target).parent('.tag-select-item');
      $(tagHtml).remove();
      _self.currentTagList.splice($.inArray(tag,_self.currentTagList),1);
      _self.dropdown.css({'top':_self.inputbox.height() + 6 + 'px','width':_self.inputbox.width() + 12 +'px'});
      _self.updateValue();
    };

    //tag超出預定
    this.callOverflow = function(){
      alert('最多只能選擇' + _self.setting.maxNum + '個');
    }

    //初始化
    this.initView();

    return this;
  };

  TagSelect.prototype = {
    init: function(){ 
      return this.$element;
    }
  };

}(jQuery));
