/// <reference path="./ExtendedListboxInstance.ts" />
/// <reference path="./BaseListBox.ts" />
/// <reference path="./MultiSelectListbox.ts" />
/// <reference path="./SingleSelectListbox.ts" />
/// <reference path="./contract/ListboxSettings.ts" />

module EL {
    "use strict";

    function initializeListBoxFromOptions(options: ListboxSettings): ExtendedListboxInstance|ExtendedListboxInstance[] {
        "use strict";

        var settings: ListboxSettings = new ListboxSettings();
        settings = $.extend(settings, options);

        var multipleInstances: ExtendedListboxInstance[] = [];
        var singleInstance: ExtendedListboxInstance = null;
        var multipleElements: boolean = this.length > 1;

        var setInstance: Function = function (instance: ExtendedListboxInstance): void {
            if (multipleElements) {
                multipleInstances.push(instance);
            } else {
                singleInstance = instance;
            }
        };

        this.each(function (): void {
            var listbox: BaseListBox;
            var instance: ExtendedListboxInstance;
            var $this: JQuery = $(this);

            if ($this.data('listbox-instance')) {
                setInstance($this.data('listbox-instance'));
                return;
            }

            if (settings.multiple) {
                listbox = new MultiSelectListbox($this, settings);
            } else {
                listbox = new SingleSelectListbox($this, settings);
            }

            instance = ExtendedListboxInstance.createFrom(listbox, $this);

            $this.data('listbox', listbox);
            $this.data('listbox-instance', instance);

            setInstance(instance);
        });

        return multipleElements ? multipleInstances : singleInstance;
    }


    /**
     * jQuery plugin definition. Please note, that jQuery's `each()` method
     * returns `false` to stop iteration; otherwise it should return `true`.
     *
     * @param {object} options an object with Listbox settings
     */
    $.fn.listbox = function (options: ListboxSettings): any {
        if (typeof options === 'object' || !options) {
            return initializeListBoxFromOptions.call(this, options);
        }
    };
}
