'use client';
import { useEffect, useRef } from 'react';
import { resizeAndEncode } from '@/lib/image';

export function UploadZone({ onImage }: { onImage: (base64: string) => void }) {
  // Hold the latest onImage in a ref so the window listeners (registered once)
  // always call the current callback, not the one from first render.
  const onImageRef = useRef(onImage);
  useEffect(() => {
    onImageRef.current = onImage;
  });

  async function handleBlob(blob: Blob) {
    const b64 = await resizeAndEncode(blob);
    onImageRef.current(b64);
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) await handleBlob(f);
    e.target.value = '';
  }

  async function onPasteButton() {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const type = item.types.find((t) => t.startsWith('image/'));
        if (type) {
          const blob = await item.getType(type);
          await handleBlob(blob);
          return;
        }
      }
    } catch (e) {
      console.error('Clipboard read failed', e);
    }
  }

  useEffect(() => {
    async function ingest(blob: Blob) {
      const b64 = await resizeAndEncode(blob);
      onImageRef.current(b64);
    }
    function onPaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const it of items) {
        if (it.type.startsWith('image/')) {
          const file = it.getAsFile();
          if (file) ingest(file);
          return;
        }
      }
    }
    function onDrop(e: DragEvent) {
      e.preventDefault();
      const f = e.dataTransfer?.files?.[0];
      if (f && f.type.startsWith('image/')) ingest(f);
    }
    function onDragOver(e: DragEvent) { e.preventDefault(); }
    window.addEventListener('paste', onPaste);
    window.addEventListener('drop', onDrop);
    window.addEventListener('dragover', onDragOver);
    return () => {
      window.removeEventListener('paste', onPaste);
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('dragover', onDragOver);
    };
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <label className="px-3 py-1 border rounded cursor-pointer">
        Upload screenshot
        <input
          type="file"
          accept="image/*"
          aria-label="Upload screenshot"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
      <button onClick={onPasteButton} className="px-3 py-1 border rounded">
        Paste
      </button>
    </div>
  );
}
