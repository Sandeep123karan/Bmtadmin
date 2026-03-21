const BedBreakfast = require("../models/bedBreakfastModel");

/* =====================================================
   GENERATE PROPERTY ID
===================================================== */
const generatePropertyId = () => {
  return "BNB" + Date.now();
};

/* =====================================================
   CREATE BNB
===================================================== */
exports.createBedBreakfast = async (req, res) => {
  try {
    const files = req.files || {};

    if (!req.body.propertyName || !req.body.ownerName || !req.body.email) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      });
    }

    const newBNB = new BedBreakfast({
      ...req.body,
      propertyId: generatePropertyId(),

      propertyImages: files.propertyImages?.map(f => f.path) || [],
      frontImage: files.frontImage?.map(f => f.path) || [],
      receptionImage: files.receptionImage?.map(f => f.path) || [],

      documents: {
        ownerPhoto: files.ownerPhoto?.map(f => f.path) || [],
        aadharCard: {
          front: files.aadharFront?.map(f => f.path) || [],
          back: files.aadharBack?.map(f => f.path) || []
        },
        panCard: files.panCard?.map(f => f.path) || [],
        gstCertificate: files.gstCertificate?.map(f => f.path) || [],
        propertyProof: files.propertyProof?.map(f => f.path) || [],
        bankProof: {
          passbook: files.passbook?.map(f => f.path) || [],
          cancelledCheque: files.cancelledCheque?.map(f => f.path) || []
        },
        license: files.license?.map(f => f.path) || [],
        otherDocuments: files.otherDocuments?.map(f => f.path) || []
      }
    });

    const saved = await newBNB.save();

    res.status(201).json({
      success: true,
      message: "Bed & Breakfast created successfully",
      data: saved
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================================
   GET ALL
===================================================== */
exports.getAllBedBreakfast = async (req, res) => {
  try {
    const data = await BedBreakfast.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      total: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================================
   GET APPROVED ONLY
===================================================== */
exports.getApprovedBNB = async (req, res) => {
  try {
    const data = await BedBreakfast.find({
      status: "approved",
      isActive: true
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      total: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================================
   GET PENDING
===================================================== */
exports.getPendingBNB = async (req, res) => {
  try {
    const data = await BedBreakfast.find({ status: "pending" });

    res.json({
      success: true,
      total: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================================
   GET SINGLE
===================================================== */
exports.getSingleBedBreakfast = async (req, res) => {
  try {
    const data = await BedBreakfast.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "BNB not found"
      });
    }

    res.json({ success: true, data });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================================
   UPDATE (SAFE UPDATE)
===================================================== */
exports.updateBedBreakfast = async (req, res) => {
  try {
    const files = req.files || {};
    const existing = await BedBreakfast.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "BNB not found"
      });
    }

    const updatedData = {
      ...req.body,

      propertyImages: files.propertyImages
        ? files.propertyImages.map(f => f.path)
        : existing.propertyImages,

      frontImage: files.frontImage
        ? files.frontImage.map(f => f.path)
        : existing.frontImage,

      receptionImage: files.receptionImage
        ? files.receptionImage.map(f => f.path)
        : existing.receptionImage,

      documents: {
        ownerPhoto: files.ownerPhoto
          ? files.ownerPhoto.map(f => f.path)
          : existing.documents.ownerPhoto,

        aadharCard: {
          front: files.aadharFront
            ? files.aadharFront.map(f => f.path)
            : existing.documents.aadharCard.front,

          back: files.aadharBack
            ? files.aadharBack.map(f => f.path)
            : existing.documents.aadharCard.back
        },

        panCard: files.panCard
          ? files.panCard.map(f => f.path)
          : existing.documents.panCard,

        gstCertificate: files.gstCertificate
          ? files.gstCertificate.map(f => f.path)
          : existing.documents.gstCertificate,

        propertyProof: files.propertyProof
          ? files.propertyProof.map(f => f.path)
          : existing.documents.propertyProof,

        bankProof: {
          passbook: files.passbook
            ? files.passbook.map(f => f.path)
            : existing.documents.bankProof.passbook,

          cancelledCheque: files.cancelledCheque
            ? files.cancelledCheque.map(f => f.path)
            : existing.documents.bankProof.cancelledCheque
        },

        license: files.license
          ? files.license.map(f => f.path)
          : existing.documents.license,

        otherDocuments: files.otherDocuments
          ? files.otherDocuments.map(f => f.path)
          : existing.documents.otherDocuments
      }
    };

    const updated = await BedBreakfast.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      success: true,
      message: "BNB updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================================
   ADMIN APPROVE / REJECT
===================================================== */
exports.approveRejectBNB = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const updated = await BedBreakfast.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: `BNB ${status} successfully`,
      data: updated
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =====================================================
   DELETE
===================================================== */
exports.deleteBedBreakfast = async (req, res) => {
  try {
    await BedBreakfast.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "BNB deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};