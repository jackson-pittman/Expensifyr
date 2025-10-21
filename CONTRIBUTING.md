# Contributing to Expensifyr

Thank you for your interest in contributing to Expensifyr! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Keep discussions professional and on-topic

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue describing:
   - Use case and motivation
   - Proposed solution
   - Alternative approaches considered
   - Potential impact on existing features

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/jackson-pittman/Expensifyr.git
   cd Expensifyr
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Frontend tests
   cd frontend && npm test -- --watchAll=false
   
   # Integration tests
   cd backend && npm run test:integration
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: brief description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all tests pass
   - Wait for review

## Development Setup

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

Quick setup:
```bash
# Backend
cd backend && npm install && npm start

# Frontend (new terminal)
cd frontend && npm install && npm start
```

## Code Style

### JavaScript/React

- Use ES6+ features
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Keep functions small and focused
- Use meaningful variable names

### File Organization

```
backend/
  src/
    routes/      # API endpoints
    services/    # Business logic
    utils/       # Helper functions
  __tests__/     # Test files

frontend/
  src/
    components/  # React components
    services/    # API clients
```

### Testing

- Write tests for new features
- Maintain or improve coverage
- Test edge cases and error handling
- Use descriptive test names

Example:
```javascript
describe('ReceiptParser', () => {
  it('should parse date in MM/DD/YYYY format', () => {
    // Test implementation
  });
});
```

## API Guidelines

### REST Endpoints

- Use appropriate HTTP methods (GET, POST, DELETE)
- Return proper status codes
- Include error messages in responses
- Follow existing patterns

### Request/Response Format

```javascript
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "error": "Error description",
  "message": "Detailed message"
}
```

## Documentation

Update documentation when:
- Adding new features
- Changing API endpoints
- Modifying configuration
- Adding dependencies

Files to update:
- `README.md` - Main documentation
- `DEPLOYMENT.md` - Deployment changes
- `TESTING.md` - New test patterns
- Code comments - Complex logic

## Commit Messages

Use clear, descriptive commit messages:

```
Good:
- Add receipt upload validation
- Fix date parsing for European format
- Update deployment instructions

Bad:
- Fix bug
- Update code
- Changes
```

Format:
```
<type>: <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `test`: Tests
- `refactor`: Code refactoring
- `style`: Code style changes
- `chore`: Maintenance tasks

## Review Process

1. Automated tests run on PR
2. Code review by maintainers
3. Requested changes (if any)
4. Approval and merge

## Areas for Contribution

### Good First Issues

- Documentation improvements
- Test coverage expansion
- UI/UX enhancements
- Bug fixes

### Advanced Topics

- Performance optimization
- Security enhancements
- Cloud deployment automation
- Additional OCR features
- Multi-language support

## Questions?

- Check existing documentation
- Review closed issues and PRs
- Ask in issue comments
- Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the GNU General Public License v3.0.

## Recognition

Contributors will be acknowledged in:
- GitHub contributors page
- Release notes for significant contributions
- Project README (for major features)

Thank you for contributing to Expensifyr! 🙏
