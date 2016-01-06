/* Extended Listbox 1.0.6; (c) 2016 Christian Kotzbauer; BSD-3-Clause License */ 
var ExtendedListbox;!function(t){"use strict";var e=function(){function t(){this.visible=!1,this.icon=null,this.onClick=null}return t}();t.ListboxSearchBarButtonOptions=e}(ExtendedListbox||(ExtendedListbox={}));var ExtendedListbox;!function(t){"use strict";var e=function(){function t(){this.text=null,this.id=null,this.index=null,this.disabled=!1,this.selected=!1,this.groupHeader=!1,this.parentGroupId=null,this.childItems=[]}return t}();t.ListboxItem=e}(ExtendedListbox||(ExtendedListbox={}));var ExtendedListbox;!function(t){"use strict";var e=function(){function e(){this.searchBar=!1,this.searchBarWatermark="Search...",this.searchBarButton=new t.ListboxSearchBarButtonOptions,this.multiple=!1,this.getItems=null,this.onValueChanged=null,this.onFilterChanged=null,this.onItemsChanged=null}return e}();t.ListboxSettings=e}(ExtendedListbox||(ExtendedListbox={}));var ExtendedListbox;!function(t){"use strict";var e=function(){function e(t,e){this._parent=t,this._settings=e,this._createListbox()}return e.prototype._createListbox=function(){this._parent.addClass(e.MAIN_CLASS),this._settings.searchBar&&this._createSearchbar(),this._createList()},e.prototype._createSearchbar=function(){var t=$("<div>").addClass(e.SEARCHBAR_CLASS+"-wrapper").appendTo(this._parent),s=$("<input>").addClass(e.SEARCHBAR_CLASS).appendTo(t).attr("placeholder",this._settings.searchBarWatermark),i=this;if(s.keyup(function(){var t=$(this).val().toLowerCase();""!==t?(i._list.find("."+e.LIST_ITEM_CLASS).each(function(){var s=$(this);if(!s.hasClass(e.LIST_ITEM_CLASS_GROUP)){var i=s.text().toLowerCase();-1!==i.search("^"+t)?(s.css("display","block"),s.parent().css("display","block")):s.css("display","none")}}),i._list.find("."+e.LIST_ITEM_CLASS_GROUP).each(function(){var t=$(this);0===t.children(":visible").length?t.css("display","none"):t.css("display","block")})):i._list.find("."+e.LIST_ITEM_CLASS).each(function(){$(this).css("display","block")}),i.onFilterChange&&i.onFilterChange()}),this._settings.searchBarButton.visible){var n=$("<button>").attr("id","searchBarButton").attr("tabindex","-1").addClass(e.SEARCHBAR_BUTTON_CLASS).appendTo(t);this._settings.searchBarButton.onClick&&n.click(this._settings.searchBarButton.onClick),$("<i>").addClass(this._settings.searchBarButton.icon).appendTo(n)}this._searchbarWrapper=t,this._searchbar=s},e.prototype._createList=function(){if(this._list=$("<div>").addClass(e.LIST_CLASS).appendTo(this._parent),this._resizeListToListbox(),this._settings.getItems){var t=this._settings.getItems();if(t){var s;for(s in t)this.addItem(this._prepareDataItem(t[s]),!0)}}},e.prototype._generateItemId=function(){var t=parseInt(""+1e7*Math.random(),10);return"listboxitem"+t},e.prototype._prepareDataItem=function(e){var s=new t.ListboxItem;if(e.id||(s.id=this._generateItemId()),"string"==typeof e||"number"==typeof e)return s.text=e,s;s=$.extend(s,e);var i,n=[];for(i in s.childItems)n.push(this._prepareDataItem(s.childItems[i]));return s.childItems=n,s},e.prototype._addItem=function(t,s,i){var n=this,a=$("<div>").addClass(e.LIST_ITEM_CLASS).text(t.text).attr("id",t.id).attr("title",t.text).data("dataItem",t).click(function(){n.onItemClick($(this))});if(t.disabled&&a.addClass(e.LIST_ITEM_CLASS_DISABLED),t.groupHeader&&a.addClass(e.LIST_ITEM_CLASS_GROUP),t.selected&&this.onItemClick(a),t.parentGroupId){var r=$("#"+t.parentGroupId,this._list);0===r.length&&(r=$('div[title="'+t.parentGroupId+'"]')),r.length>0&&(i=r)}i&&a.addClass(e.LIST_ITEM_CLASS_CHILD);var o=i?i:this._list;if(void 0===t.index||null===t.index||s?a.appendTo(o):(o=o.children().eq(t.index),a.insertBefore(o)),t.childItems&&t.childItems.length>0){a.hasClass(e.LIST_ITEM_CLASS_GROUP)||a.addClass(e.LIST_ITEM_CLASS_GROUP);var l;for(l=0;l<t.childItems.length;l++){var d=t.childItems[l];this._addItem(d,s,a)}}return t.id},e.prototype.addItem=function(t,e){e||this._settings.multiple||!t.selected||this.clearSelection(e);var s=this._addItem(this._prepareDataItem(t),e,null);return e||this._settings.onItemsChanged&&this._settings.onItemsChanged(this.getItems()),s},e.prototype.removeItem=function(t){var s,i=this._list.find("."+e.LIST_ITEM_CLASS);for(s in i){var n=$(i[s]);if(n.text()===t||n.attr("id")===t)return this._clearItemSelection(n),n.remove(),void(this._settings.onItemsChanged&&this._settings.onItemsChanged(this.getItems()))}},e.prototype.destroy=function(){this._parent.children().remove(),this._parent.removeClass(e.MAIN_CLASS)},e.prototype._resizeListToListbox=function(){var t=this._parent.height();this._settings.searchBar&&(t-=this._searchbarWrapper.outerHeight(!0)),this._list.height(t)},e.prototype.clearSelection=function(t){var s=this._list.find("."+e.LIST_ITEM_CLASS);s.removeClass(e.LIST_ITEM_CLASS_SELECTED);var i;for(i=0;i<s.length;i++)$(s[i]).data("dataItem").selected=!1;this._settings.multiple?this._parent.val([]):this._parent.val(null),t||this._parent.trigger("change")},e.prototype._clearItemSelection=function(t){if(t.removeClass(e.LIST_ITEM_CLASS_SELECTED),t.data("dataItem").selected=!1,this._settings.multiple){var s=this._parent.val(),i=s.indexOf(JSON.stringify(t.data("dataItem")));s.splice(i,1),this._parent.val(s)}else this._parent.val(null);this._parent.trigger("change")},e.prototype.getItem=function(t){var e=null,s=$("#"+t,this._list);return 0===s.length&&(s=$('div[title="'+t+'"]')),s.length>0&&(e=s.data("dataItem")),e},e.prototype.getItems=function(){var t,e=[],s=this._list.children();for(t=0;t<s.length;t++)e.push($(s[t]).data("dataItem"));return e},e.prototype.moveItemUp=function(t){var e=null,s=$("#"+t,this._list);return 0===s.length&&(s=$('div[title="'+t+'"]')),s.length>0&&(s.insertBefore(s.prev()),e=s.index(),s.data("dataItem").index=e),this._settings.onItemsChanged&&this._settings.onItemsChanged(this.getItems()),e},e.prototype.moveItemDown=function(t){var e=null,s=$("#"+t,this._list);return 0===s.length&&(s=$('div[title="'+t+'"]')),s.length>0&&(s.insertAfter(s.next()),e=s.index(),s.data("dataItem").index=e),this._settings.onItemsChanged&&this._settings.onItemsChanged(this.getItems()),e},e.prototype.enable=function(t){t?this._parent.removeClass(e.MAIN_DISABLED_CLASS):this._parent.hasClass(e.MAIN_DISABLED_CLASS)||this._parent.addClass(e.MAIN_DISABLED_CLASS)},e.MAIN_CLASS="listbox-root",e.MAIN_DISABLED_CLASS="listbox-disabled",e.LIST_CLASS="listbox",e.LIST_ITEM_CLASS="listbox-item",e.LIST_ITEM_CLASS_DISABLED="listbox-item-disabled",e.LIST_ITEM_CLASS_SELECTED="listbox-item-selected",e.LIST_ITEM_CLASS_GROUP="listbox-item-group",e.LIST_ITEM_CLASS_CHILD="listbox-item-child",e.SEARCHBAR_CLASS="listbox-searchbar",e.SEARCHBAR_BUTTON_CLASS="listbox-searchbar-button",e}();t.BaseListBox=e}(ExtendedListbox||(ExtendedListbox={}));var __extends=this&&this.__extends||function(t,e){function s(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(s.prototype=e.prototype,new s)},ExtendedListbox;!function(t){"use strict";var e=function(e){function s(t,s){e.call(this,t,s)}return __extends(s,e),s.prototype.onItemClick=function(e){if(!e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_DISABLED)&&!e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_GROUP)){var s=this._parent.val();if(e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_SELECTED)){e.removeClass(t.BaseListBox.LIST_ITEM_CLASS_SELECTED);var i=s.indexOf(JSON.stringify(e.data("dataItem")));s.splice(i,1),e.data("dataItem").selected=!1}else e.addClass(t.BaseListBox.LIST_ITEM_CLASS_SELECTED),e.data("dataItem").selected=!0,s||(s=[]),s.push(JSON.stringify(e.data("dataItem")));this._parent.val(s),this._parent.trigger("change"),this._settings.onValueChanged&&this._settings.onValueChanged(s)}},s.prototype.onFilterChange=function(){return void 0},s}(t.BaseListBox);t.MultiSelectListbox=e}(ExtendedListbox||(ExtendedListbox={}));var ExtendedListbox;!function(t){"use strict";var e=function(e){function s(t,s){e.call(this,t,s),this._selectedDomItem=null}return __extends(s,e),s.prototype.onItemClick=function(e){e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_DISABLED)||e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_GROUP)||(this._selectedDomItem&&(this.clearSelection(!0),this._selectedDomItem=null),e.toggleClass(t.BaseListBox.LIST_ITEM_CLASS_SELECTED),this._selectedDomItem=e,e.data("dataItem").selected=!0,this._parent.val(e.data("dataItem")),this._parent.trigger("change"),this._settings.onValueChanged&&this._settings.onValueChanged(e.data("dataItem")))},s.prototype.onFilterChange=function(){if(!this._selectedDomItem||!this._selectedDomItem.is(":visible")){var t=this._list.children(":visible").first();t&&t.length>0&&this.onItemClick(t)}this._settings.onFilterChanged&&this._settings.onFilterChanged(this._searchbar.val())},s}(t.BaseListBox);t.SingleSelectListbox=e}(ExtendedListbox||(ExtendedListbox={}));var ExtendedListbox;!function(t){"use strict";function e(e){var s=new t.ListboxSettings;return s=$.extend(s,e),this.each(function(){var e;return e=s.multiple?new t.MultiSelectListbox($(this),s):new t.SingleSelectListbox($(this),s),$(this).data("listbox",e),!!e})}function s(t,e){var s=["addItem","removeItem","destroy","getItem","getItems","moveItemUp","moveItemDown","clearSelection","enable"],i=null;return this.each(function(){var n=$(this).data("listbox");if(null==n&&window.console&&console.error)return void console.error("The listbox('"+t+"') method was called on an element that is not using ListBox.");if(-1===$.inArray(t,s))return void console.error(""+t+" is no public API function.");var a=Array.prototype.slice.call(e,1);i=n[t].apply(n,a)}),i}$.fn.listbox=function(t){return"object"==typeof t?e.call(this,t):"string"==typeof t?s.call(this,t,arguments):void 0}}(ExtendedListbox||(ExtendedListbox={}));var ExtendedListbox;!function(t){"use strict";var e=function(){function t(){}return t.warning=function(t){console.warn(t)},t}();t.Util=e}(ExtendedListbox||(ExtendedListbox={}));