"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Equal, X } from "lucide-react";
import { useState } from "react";

/* =========================
   Sortable Row Component
========================= */
const SortableRow = ({
  field,
  isSelected,
  removeField,
  caption,
  setCaption,
  isDragging,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
      items-center border-b border-gray-200 dark:border-gray-800
      ${!isSelected ? "opacity-80" : ""}
      bg-white dark:bg-gray-900`}
    >
      {/* LEFT */}
      <div className="flex items-center justify-between px-3 py-2 border-r border-gray-200 dark:border-gray-800 min-w-0">
        
        <div className="flex items-center gap-2 min-w-0">
          
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="w-5 h-5 flex items-center justify-center rounded-full 
            bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
            cursor-grab active:cursor-grabbing shrink-0"
          >
            <Equal size={10} className="text-gray-400" />
          </div>

          {/* Field Name */}
          <span className="text-[11px] text-gray-600 dark:text-gray-300 truncate">
            {field}
          </span>
        </div>

        {/* Remove */}
        {isSelected && (
          <div
            onClick={() => removeField(field)}
            className="w-5 h-5 flex items-center justify-center rounded-full 
            bg-gray-100 dark:bg-gray-800 hover:bg-red-500 transition cursor-pointer shrink-0"
          >
            <X size={10} className="text-gray-400 hover:text-white" />
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="px-3 py-1 min-w-0">
        <input
          value={caption || ""}
          onChange={(e) => setCaption(field, e.target.value)}
          disabled={!isSelected}
          placeholder="Enter Caption"
          className="w-full h-7 text-[11px] px-2 rounded 
          border border-gray-200 dark:border-gray-700 
          bg-gray-50 dark:bg-gray-800 
          focus:outline-none focus:ring-1 focus:ring-ds-primary
          disabled:opacity-50"
        />
      </div>
    </div>
  );
};

/* =========================
   Main Component
========================= */
const FieldsRowSelectorTable = ({
  fields = [],
  selected = [],
  removeField,
}) => {
  const [items, setItems] = useState(fields);
  const [captions, setCaptions] = useState({});
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.indexOf(active.id);
        const newIndex = prev.indexOf(over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => setActiveId(null);

  const setCaption = (field, value) => {
    setCaptions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="border rounded-md overflow-hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">

      {/* HEADER */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] bg-ds-primary text-white text-[0.8rem] font-normal">
        <div className="px-3 py-1.5 border-r border-ds-primary/50/50">
          Selected Fields
        </div>
        <div className="px-3 py-1.5">
          Changed Captions
        </div>
      </div>

      {/* BODY */}
      <div className="max-h-[180px] overflow-y-auto table-scroll">

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={items}
            strategy={verticalListSortingStrategy}
          >
            {items.map((field) => {
              const isSelected = selected.includes(field);

              return (
                <SortableRow
                  key={field}
                  field={field}
                  isSelected={isSelected}
                  removeField={removeField}
                  caption={captions[field]}
                  setCaption={setCaption}
                  isDragging={activeId === field}
                />
              );
            })}
          </SortableContext>

          {/* DRAG OVERLAY (Fixes overlapping issues) */}
          <DragOverlay>
            {activeId ? (
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
              items-center border bg-white shadow-lg rounded-md px-3 py-2 text-[11px]">
                {activeId}
              </div>
            ) : null}
          </DragOverlay>

        </DndContext>

      </div>
    </div>
  );
};

export default FieldsRowSelectorTable;