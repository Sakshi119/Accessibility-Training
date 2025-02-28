document.addEventListener("DOMContentLoaded", function () {
    const draggableItems = document.querySelectorAll(".draggable");
    const dropZones = document.querySelectorAll(".drop-zone");
    const statusRegion = document.getElementById("drag-status");

    let currentItem = null;
    let draggedItem = null;

    // Assign unique IDs to draggable items (if not already set)
    draggableItems.forEach((item, index) => {
        if (!item.id) {
            item.id = "draggable-item-" + index;
        }
    });

    // 🎯 Keyboard Selection for Accessibility
    draggableItems.forEach(item => {
        item.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleSelection(this);
            }
        });
    });

    function toggleSelection(item) {
        if (currentItem) {
            statusRegion.textContent = "Item deselected: " + currentItem.textContent;
        }
        const isSelected = item.getAttribute("data-selected") === "true";
        currentItem = isSelected ? null : item;
        item.setAttribute("data-selected", !isSelected);
        item.style.background = isSelected ? "#3498db" : "#e74c3c";

        // Live status update for screen readers
        statusRegion.textContent = isSelected
            ? "Item deselected: " + item.textContent
            : "Item selected: " + item.textContent;
    }

    // 🎯 Move to Dropzone Using Keyboard (Enter/Space)
    dropZones.forEach(zone => {
        zone.addEventListener("keydown", function (e) {
            if (currentItem && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                this.appendChild(currentItem);
                currentItem.style.background = "#3498db";
                currentItem.setAttribute("data-selected", "false");
                statusRegion.textContent =
                    currentItem.textContent + " moved to " + this.getAttribute("aria-label");
                currentItem = null;
            }
        });
    });

    // 🎯 Highlight Drop Zones on Focus
    dropZones.forEach(zone => {
        zone.addEventListener("focus", function () {
            this.classList.add("highlight");
        });
        zone.addEventListener("blur", function () {
            this.classList.remove("highlight");
        });
    });

    // 🎯 Enable Mouse Dragging
    draggableItems.forEach(item => {
        item.addEventListener("dragstart", function (e) {
            draggedItem = this;
            e.dataTransfer.setData("text/plain", this.id); // ✅ Store the ID
            e.dataTransfer.effectAllowed = "move";
            setTimeout(() => (this.style.display = "none"), 0);
        });

        item.addEventListener("dragend", function () {
            setTimeout(() => (this.style.display = "block"), 0);
            draggedItem = null;
        });
    });

    // 🎯 Enable Dragging Over Drop Zones
    dropZones.forEach(zone => {
        zone.addEventListener("dragover", function (e) {
            e.preventDefault(); // ✅ Allows dropping
        });

        // 🎯 Handle Dropping Items
        zone.addEventListener("drop", function (e) {
            e.preventDefault();
            const draggedItemId = e.dataTransfer.getData("text/plain"); // ✅ Retrieve ID
            const draggedElement = document.getElementById(draggedItemId); // ✅ Get the element

            if (draggedElement) {
                this.appendChild(draggedElement);
                draggedElement.style.display = "block"; // Ensure visibility after dropping
                statusRegion.textContent =
                    draggedElement.textContent + " dropped in " + this.getAttribute("aria-label");
                draggedItem = null;
            }
        });
    });
});
