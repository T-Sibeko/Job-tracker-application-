(function() {
    const themeNames = ["teal", "pink", "purple"];
    const storageKey = "nothaTheme";

    function applyTheme(themeName, persist) {
        const selectedTheme = themeNames.includes(themeName) ? themeName : "teal";

        document.body.dataset.theme = selectedTheme;

        document.querySelectorAll('input[name="theme"]').forEach(function(option) {
            option.checked = option.value === selectedTheme;
        });

        document.querySelectorAll("[data-theme-selector]").forEach(function(selector) {
            selector.value = selectedTheme;
        });

        if (persist) {
            localStorage.setItem(storageKey, selectedTheme);
        }

        document.dispatchEvent(new CustomEvent("themeChanged", {
            detail: { theme: selectedTheme }
        }));
    }

    applyTheme(localStorage.getItem(storageKey), false);

    document.querySelectorAll('input[name="theme"]').forEach(function(option) {
        option.addEventListener("change", function() {
            if (option.checked) {
                applyTheme(option.value, true);
            }
        });
    });

    document.querySelectorAll("[data-theme-selector]").forEach(function(selector) {
        selector.addEventListener("change", function() {
            applyTheme(selector.value, true);
        });
    });

    window.addEventListener("storage", function(event) {
        if (event.key === storageKey) {
            applyTheme(event.newValue, false);
        }
    });
})();
