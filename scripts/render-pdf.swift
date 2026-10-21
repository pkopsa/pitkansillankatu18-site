// PDF:n ensimmäinen sivu PNG-kuvaksi (korvaa `pdftoppm -r 200 -png`, jota ei ole tällä koneella).
// Käyttö: swift scripts/render-pdf.swift <in.pdf> <out.png> [dpi=200]
import AppKit
import PDFKit

let args = CommandLine.arguments
guard args.count >= 3, let doc = PDFDocument(url: URL(fileURLWithPath: args[1])), let page = doc.page(at: 0) else {
    FileHandle.standardError.write("Käyttö: swift render-pdf.swift <in.pdf> <out.png> [dpi]\n".data(using: .utf8)!)
    exit(1)
}
let dpi = args.count > 3 ? Double(args[3]) ?? 200 : 200
let box = page.bounds(for: .mediaBox)
let scale = dpi / 72.0
let width = Int(box.width * scale), height = Int(box.height * scale)

let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height,
                           bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
                           colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
let ctx = NSGraphicsContext(bitmapImageRep: rep)!
NSGraphicsContext.current = ctx
ctx.cgContext.setFillColor(NSColor.white.cgColor)
ctx.cgContext.fill(CGRect(x: 0, y: 0, width: width, height: height))
ctx.cgContext.scaleBy(x: scale, y: scale)
page.draw(with: .mediaBox, to: ctx.cgContext)
NSGraphicsContext.restoreGraphicsState()

try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: args[2]))
print("\(args[2]): \(width)×\(height) px @ \(Int(dpi)) dpi")
