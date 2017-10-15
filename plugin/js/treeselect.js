jQuery.fn.treeSelect = function (options) {

    var _this = this;
    var level = 0;
    var selector = $(this).attr('id');
    /**
     * 
     * @type Object
     */
    var _dataAttributes = $(_this).data();

    var multipleValues = [];
    /**
     * default settings
     * @type type
     */
    var defaults = {
        multiple: false, // 
        parentNodeRelative: true, // set parent node css postition to relative 
        //If you set false this value the dropdown list maybe not will display correctly
        source: {}, // source json object from multidimesional php array
        parensSelectable: false
    };
    /**
     * Delete _options element if the deafult object does not contain it.
     */
    $.each(options, function (optionKey, optionVal) {
        if (!(optionKey in defaults)) {
            delete options[optionKey];
        }
    });
    /**
     * Delete  data attribute element if the deafult object does not contain it.
     * Override _options object with data attributes.
     */
    $.each(_dataAttributes, function (dataAttributeKey, dataAttributeVal) {
        if (!(dataAttributeKey in defaults)) {
            delete _dataAttributes[dataAttributeKey];
        }
        options[dataAttributeKey] = dataAttributeVal;
    });
    /**
     * 
     * @type {Object}
     */
    var settings = $.extend({}, defaults, options);

    /**
     * 
     * @param Object levelData
     * @returns {String}
     */
    var setDropdownListView = function (levelData) {
        level++;
        var dropdownListView = "<ul " + ((level === 1) ? 'class="treeselect-ul treeselect-hide"' : '') + ">";

        $.each(levelData, function (index, value) {
            validate(value);
            var hasChildren = ('children' in value);

            var classValue = "";
            if (hasChildren) {
                classValue += 'treeselect-haschildren';
                if (settings.parensSelectable) {
                    classValue += ' treeselect-hover treeselect-selectable';
                }
            } else {
                classValue += 'treeselect-hasnotchildren treeselect-hover treeselect-selectable';
            }

            dropdownListView += "<li data-value='" + value.id + "' class='" + classValue + " level-" + level + "' >" + value.name + "</li>";
            if (hasChildren) {
                dropdownListView += "<li>" + setDropdownListView(value.children) + "</li>";
            }
        });

        dropdownListView += "</ul>";
        level = (level > 1) ? level - 1 : 1;
        return dropdownListView;
    };
    /**
     * 
     * @param {Object} levelObject
     * @returns {void}
     */
    var validate = function (levelObject) {
        if (typeof levelObject !== 'object') {
            console.log('TreeSelect error: It is not an object');
        }
        if (!('id' in levelObject)) {
            console.log('TreeSelect error: Missing id from source!');
        }
        if (!('name' in levelObject)) {
            console.log('TreeSelect error: Missing name from source!');
        }
    };

    var closeDropdownList = function () {
        if (_this.next('ul.treeselect-ul').hasClass('treeselect-show')) {
            $(_this).next('ul.treeselect-ul')
                    .removeClass('treeselect-show')
                    .addClass('treeselect-hide');
        }
    };

    $(setDropdownListView(settings.source)).insertAfter(_this);

    if (settings.parentNodeRelative) {
        $(_this).parent().css({'position': 'relative'});
    }

    $(_this).click(function () {

        if ($(this).next('ul.treeselect-ul').hasClass('treeselect-hide')) {
            $(this).next('ul.treeselect-ul')
                    .removeClass('treeselect-hide')
                    .addClass('treeselect-show');
        } else {
            $(this).next('ul.treeselect-ul')
                    .removeClass('treeselect-show')
                    .addClass('treeselect-hide');
        }
    });

    $('ul.treeselect-ul').on('click', 'li.treeselect-selectable', function () {
        var value = $(this).data('value');

        if (settings.multiple) {
            multipleValues.push(value);
            //console.log(multipleValues);
        } else {
            if (settings.parensSelectable || $(this).hasClass('treeselect-hasnotchildren')) {

                $(_this).val(value);
                $(_this).next('ul.treeselect-ul').find('li.treeselect-selected').removeClass('treeselect-selected');
            }
        }

        $(this).addClass('treeselect-selected');

        closeDropdownList();
        return false;
    });

    $(document).click(function (event) {
        if ((!$(event.target).closest('ul.treeselect-ul').length) && $(event.target).attr('id') !== selector) {
            closeDropdownList();
        }
    });
};