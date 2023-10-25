// src/__ tests __/App.test.tsx

import '@testing-library/jest-dom'
import { render,screen } from "@testing-library/react"
import AppRoutes from "../route/routes"

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<AppRoutes/>)
    screen.debug()
})