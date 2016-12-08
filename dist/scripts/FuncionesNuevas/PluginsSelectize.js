var escape_html = function(str) {
    return (str + "").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, '"');
};

Selectize.define("NoQuitarEtiqueta", function(options) {
    SalesUp.Variables.etiquetasUsuario = SalesUp.Variables.etiquetasUsuario || '';
    if (this.settings.mode === "single") return;
    options = $.extend({
        label: "x",
        title: "Remove",
        className: "remove",
        append: true
    }, options);
    var self = this;
    var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + "</a>";
    var append = function(html_container, html_element) {
        var pos = html_container.search(/(<\/[^>]+>\s*)$/);
        return html_container.substring(0, pos) + html_element + html_container.substring(pos);
    };
    this.setup = function() {
        var original = self.setup;
        return function() {
            // override the item rendering method to add the button to each
            if (options.append) {
                var render_item = self.settings.render.item;
                self.settings.render.item = function(data) {
                    if (arguments[0].IdEtiqueta !== undefined) {
                        if ((_.indexOf(SalesUp.Variables.etiquetasUsuario.split(","), arguments[0].TKETIQ) >= 0 || _.indexOf(SalesUp.Variables.etiquetasUsuario.split(","), arguments[0].IdEtiqueta.toString()) >= 0) && SalesUp.Sistema.PermisoActivo('CompartirContacto',[0,1])) {
                            return append(render_item.apply(this, arguments), "");
                        } else {
                            return append(render_item.apply(this, arguments), html);
                        }
                    }else{
                        return append(render_item.apply(this, arguments), html);
                    }
                };
            }
            original.apply(this, arguments);
            // add event listener
            this.$control.on("click", "." + options.className, function(e) {
                e.preventDefault();
                var $item = $(e.target).parent();
                self.setActiveItem($item);
                if (self.deleteSelection()) {
                    self.setCaret(self.items.length);
                }
            });
        };
    }();
});

Selectize.define("NoQuitarUsuario", function(options) {
    SalesUp.Variables.itemsUsuarios = SalesUp.Variables.itemsUsuarios || [];
    if (this.settings.mode === "single") return;
    options = $.extend({
        label: "x",
        title: "Remove",
        className: "remove",
        append: true
    }, options);
    var self = this;
    var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + "</a>";
    var append = function(html_container, html_element) {
        var pos = html_container.search(/(<\/[^>]+>\s*)$/);
        return html_container.substring(0, pos) + html_element + html_container.substring(pos);
    };
    this.setup = function() {
        var original = self.setup;
        return function() {
            // override the item rendering method to add the button to each
            if (options.append) {
                var render_item = self.settings.render.item;
                self.settings.render.item = function(data) {
                    if ((_.indexOf(SalesUp.Variables.itemsUsuarios, arguments[0].tku) >= 0) && SalesUp.Sistema.PermisoActivo('CompartirContacto',[0,2])) {
                        return append(render_item.apply(this, arguments), "");
                    } else {
                        return append(render_item.apply(this, arguments), html);
                    }
                };
            }
            original.apply(this, arguments);
            // add event listener
            this.$control.on("click", "." + options.className, function(e) {
                e.preventDefault();
                var $item = $(e.target).parent();
                self.setActiveItem($item);
                if (self.deleteSelection()) {
                    self.setCaret(self.items.length);
                }
            });
        };
    }();
});