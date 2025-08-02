'use client'
import { useState } from 'react';

export default function Calculator() {
  setTimeout(() => {
    console.log("2")
    queueMicrotask(() => console.log("3"))
    requestAnimationFrame(() => console.log("5"))
  })
  setTimeout(() => {
    console.log("4")
    requestAnimationFrame(() => console.log("6"))
  })

  queueMicrotask(() => console.log("1"))
}