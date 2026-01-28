import '@testing-library/jest-dom'

// utilsフォルダ全体をモック化
jest.mock('../../utils/supabase')
jest.mock('../../utils/supabaseFunction')