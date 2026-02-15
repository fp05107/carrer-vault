"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Lock, Unlock } from "lucide-react"

export function VaultIntro({ onComplete }: { onComplete: () => void }) {
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsUnlocked(true)
        }, 1500)

        const finishTimer = setTimeout(() => {
            setIsVisible(false)
            onComplete()
        }, 3000)

        return () => {
            clearTimeout(timer)
            clearTimeout(finishTimer)
        }
    }, [onComplete])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <div className="relative flex flex-col items-center">
                        {/* Outer Ring */}
                        <motion.div
                            className="absolute w-64 h-64 rounded-full border-4 border-primary/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute w-56 h-56 rounded-full border-2 border-primary/40 border-dashed"
                            animate={{ rotate: -180 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Lock Icon Container */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 p-8 rounded-full bg-black border border-primary/50 shadow-[0_0_50px_rgba(34,197,94,0.3)]"
                        >
                            <AnimatePresence mode="wait">
                                {!isUnlocked ? (
                                    <motion.div
                                        key="lock"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Lock className="w-16 h-16 text-primary" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="unlock"
                                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                                    >
                                        <Unlock className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Status Text */}
                        <motion.div
                            className="mt-12 text-center space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="text-primary/60 text-sm font-mono tracking-[0.3em] uppercase">
                                {!isUnlocked ? "Authenticating..." : "Access Granted"}
                            </div>
                            <motion.div
                                className="h-1 w-32 bg-primary/20 rounded-full overflow-hidden mx-auto"
                            >
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: isUnlocked ? "100%" : "60%" }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
